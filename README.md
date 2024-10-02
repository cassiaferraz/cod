import { useEffect, useState, useContext, useRef } from 'react'
import './notification.css'
import notification from "../../../public/img/svgs/notificacao.svg"
import NotificationItem from './notificationItem/NotificationItem'
import fetchUserNotifications from '../../services/notifications/fetchUserNotifications'
import React from 'react'

export default function Notifications() {

    const divRef = useRef(null)

    const handleClickOutside = (e) => {
        if(divRef.current && !divRef.current.contains(e.target)) {
            setIsMenuOpened(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => { document.removeEventListener('mousedown', handleClickOutside) }
    }, []);

    const token = sessionStorage.getItem('token')
    // const { token } = useContext(UserContext)

    const [ notificationList, setNotificationList ] = useState([])
    const [ isMenuOpened, setIsMenuOpened ] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetchUserNotifications(token)
            if(data) setNotificationList(data)
        } 
        fetchData()

        const intervalo = setInterval(() => {
            fetchData()
        }, 30000) // Atualiza a cada 30 segundos!

        return () => clearInterval(intervalo);

    }, [ token ])  

    const removeNotificationFromList = (idNotification) => {
        let aux = [...notificationList];
        aux = aux.filter(not => not.ID_NOTIFICACAO != idNotification)
        setNotificationList(aux)
    }

    return (
        <div className='notifications_menu' ref={divRef}>
            <div className='notification_icon'  onClick={(e) => setIsMenuOpened(prev => !prev)}>
                <img src={notification}/>
                { notificationList?.length > 0 ? 
                    <div className='notification_number'>{notificationList.length}</div>
                : ''}
            </div>
            <div className='notifications_dropdown' style={ isMenuOpened ? {} : {display: 'none'}}>
                <div className='arrow'></div>
                { notificationList?.length > 0 ? 
                    notificationList.map((item, index) => 
                        <React.Fragment key={`notification_${item?.TEXTO}_${index}`}>
                            <NotificationItem notification={item} handleExclusion={removeNotificationFromList} />
                            { index != notificationList.length - 1 ? <div className='division'></div> : '' }
                        </React.Fragment>
                    )
                : 'Sem notificações pendentes'}
            </div>
        </div>
    )
}

//notiList:

import fetchReadNotification from "../../../services/notifications/fetchReadNotification"
import { FaTrash } from "react-icons/fa6";
import fetchDeleteNotification from "../../../services/notifications/fetchDeleteNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationItem({ notification, handleExclusion }) {
    const navigate = useNavigate();
    const [isRead, setIsRead] = useState(notification?.STATUS_LEITURA)  

    const handleOnClick = async (e) => {
        if(!notification?.STATUS_LEITURA) {
            const token = sessionStorage.getItem('token')
            const response = await fetchReadNotification(token, notification?.ID_NOTIFICACAO)
            if(!response.ok) alert("Erro ao ler notificação")
            else setIsRead(true)
        }
        if(notification.REFERENCIA.path) navigate('/' + notification.REFERENCIA.path)
    }

    const handleExcludeNotification = async () => {
        const token = sessionStorage.getItem('token')
        console.log('HERE')
        const response = await fetchDeleteNotification(token, notification?.ID_NOTIFICACAO)
        if(! response.ok) {
            alert('Erro ao excluir notificação')
        }
        else handleExclusion(notification?.ID_NOTIFICACAO)
    }

    return (
        <div className="notification_item" style={ isRead ? {color: 'var(--vivo-lightpurple50)'} : {color: 'var(--vivo-green)', fontWeight: '600'} }>
            <div className="text" onClick={handleOnClick}>
                { notification?.TEXTO }
            </div>
            <div className="actions">
                {/* <GoUnread className="unread"/>
                <GoRead className="read" /> */}
                <FaTrash className="trash" onClick={handleExcludeNotification} />
            </div>
        </div>
    )
}
