//controller: 
const notificationModel = require('../models/notifcationModel')

/* 

NOTIFICAÇÕES - TEMPLATE

RECOMPENSAS:
    SOLICITAÇÃO:
        TEXTO: ${nome do remetente} solicitou uma recompensa
        REFERENCIA: {"path": "team/approve_rewards", "rewardId": "${id recompensa}"}

    APROVAÇÃO:
        TEXTO: Seu coordenador aprovou sua requisição de recompensa
        REFERENCIA: {"rewardId": "${id recompensa}"}

    DESAPROVAÇÃO:
        TEXTO: Seu coordenador desaprovou sua requisição de recompensa
        REFERENCIA: {"rewardId": "${id recompensa}"}
*/

// Formato categoria -> 'categoria.subcategoria'

function returnTextAndReferenceByCategory(category, data) {
    switch(category?.split('.')[0]) {
        case 'recompensas': 
            return interpretRewardsCategory(category, data)
        default:
            return { error: 'Categoria inválida' }
    }
}

function interpretRewardsCategory(category, data) {

    switch(category?.split('.')[1]) {
        case 'solicitacao':
            return { text: `${data.technicianName} solicitou uma recompensa`, reference: {path: 'team/approve_rewards', rewardId: data.rewardId}}

        case 'aprovacao':
            return { text: 'Seu coordenador aprovou sua requisição de recompensa', reference: {rewardId: data.rewardId}}

        case 'desaprovacao':
            return { text: 'Seu coordenador desaprovou sua requisição de recompensa', reference: {rewardId: data.rewardId}}

        default:
            return { error: 'Subcategoria de recompensas inválida' }
    }
} 

const createNotification = async(req, res) => {
    try {
        const category = req.body.notificationCategory
        const receiverId = req.body.receiverId
        const senderId = req.body.senderId
        const complementaryData = req.body.complementaryData

        const { text, reference, error } = returnTextAndReferenceByCategory(category, {receiverId, senderId, ...complementaryData})
        
        if(error) {
            res.status(400).json({message: error})
            return
        }

        const response = await notificationModel.createNotification(receiverId, senderId, text, JSON.stringify(reference))
    
        res.status(200).json({message: 'Notificação criada', ...response})

    } catch(error) {
        console.error(error)
        res.status(400).json({message: 'Deu ruim - createNotification'})
    }
}

const getNotificationsByReceiverId = async(req, res) => {
    try {
        const userId = req.userId
        let notifications = await notificationModel.findNotificationsByReceiverId(userId)

        notifications = notifications.map(notif => {
            return {
                ...notif,
                REFERENCIA: JSON.parse(notif.REFERENCIA)
            }
        })

        res.status(200).json(notifications)

    } catch(error) {
        console.error(error)
        res.status(400).json({message: 'Deu ruim - getNotificationsByReceiverId'})
    }
}

const changeNotificationToReaded = async(req, res) => {
    try {
        const notificationId = req.params.id
        const response = await notificationModel.updateNotificationStatus(notificationId, true)
        res.status(200).json({message: 'Notificação atualizada', ...response})

    } catch(error) {
        console.error(error)
        res.status(400).json({message: 'Deu ruim - changeNotificationToReaded'})
    }
}

const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id
        const response = await notificationModel.deleteNotification(notificationId)
        res.status(200).json({message: 'Notificação deletada', ...response})

    } catch(error) {
        console.error(error)
        res.status(400).json({message: 'Deu ruim - deleteNotification'})
    }
}

module.exports = {
    createNotification,
    getNotificationsByReceiverId,
    changeNotificationToReaded,
    deleteNotification,
}
//front:
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
