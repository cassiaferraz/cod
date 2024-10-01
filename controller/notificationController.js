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