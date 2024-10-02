const notificationModel = require('../models/notifcationModel');

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
    switch (category?.split('.')[0]) {
        case 'recompensas':
            return interpretRewardsCategory(category, data);
        default:
            return { error: 'Categoria inválida' };
    }
}

function interpretRewardsCategory(category, data) {
    if (!data || !data.rewardId) {
        return { error: 'Dados incompletos para gerar notificação de recompensa' };
    }

    switch (category?.split('.')[1]) {
        case 'solicitacao':
            if (!data.technicianName) {
                return { error: 'Nome do técnico não fornecido' };
            }
            return { text: `${data.technicianName} solicitou uma recompensa`, reference: { path: 'team/approve_rewards', rewardId: data.rewardId } };

        case 'aprovacao':
            return { text: 'Seu coordenador aprovou sua requisição de recompensa', reference: { rewardId: data.rewardId } };

        case 'desaprovacao':
            return { text: 'Seu coordenador desaprovou sua requisição de recompensa', reference: { rewardId: data.rewardId } };

        default:
            return { error: 'Subcategoria de recompensas inválida' };
    }
}

const createNotification = async (req, res) => {
    try {
        const { notificationCategory: category, receiverId, senderId, complementaryData } = req.body;

        // Validação dos parâmetros recebidos
        if (!category || !receiverId || !senderId) {
            return res.status(400).json({ message: 'Parâmetros inválidos' });
        }

        const { text, reference, error } = returnTextAndReferenceByCategory(category, { receiverId, senderId, ...complementaryData });

        if (error) {
            return res.status(400).json({ message: error });
        }

        const response = await notificationModel.createNotification(receiverId, senderId, text, JSON.stringify(reference));

        res.status(200).json({ message: 'Notificação criada', ...response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno - createNotification' });
    }
};

const getNotificationsByReceiverId = async (req, res) => {
    try {
        const userId = req.userId;

        // Validação do userId
        if (!userId) {
            return res.status(400).json({ message: 'ID de usuário não fornecido' });
        }

        let notifications = await notificationModel.findNotificationsByReceiverId(userId);

        if (!notifications) {
            return res.status(200).json([]);
        }

        notifications = notifications.map(notif => ({
            ...notif,
            REFERENCIA: JSON.parse(notif.REFERENCIA),
        }));

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno - getNotificationsByReceiverId' });
    }
};

const changeNotificationToReaded = async (req, res) => {
    try {
        const notificationId = req.params.id;

        // Validação do notificationId
        if (!notificationId) {
            return res.status(400).json({ message: 'ID da notificação não fornecido' });
        }

        const response = await notificationModel.updateNotificationStatus(notificationId, true);
        res.status(200).json({ message: 'Notificação atualizada', ...response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno - changeNotificationToReaded' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;

        // Validação do notificationId
        if (!notificationId) {
            return res.status(400).json({ message: 'ID da notificação não fornecido' });
        }

        const response = await notificationModel.deleteNotification(notificationId);
        res.status(200).json({ message: 'Notificação deletada', ...response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno - deleteNotification' });
    }
};

module.exports = {
    createNotification,
    getNotificationsByReceiverId,
    changeNotificationToReaded,
    deleteNotification,
};
