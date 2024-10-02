import { useEffect, useState, useRef } from 'react'

import './notification.css'
import notification from '../../../public/img/svgs/notificacao.svg'
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
