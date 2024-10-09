const getNotificationsByReceiverId = async(req, res) => {
    try {
        const userId = req.userId;
        console.log(`GET - Buscando notificações para o usuário: ${userId}`);
        
        let notifications = await notificationModel.findNotificationsByReceiverId(userId);
        
        notifications = notifications.map(notif => {
            return {
                ...notif,
                REFERENCIA: JSON.parse(notif.REFERENCIA)
            };
        });

        res.status(200).json(notifications);

    } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        res.status(400).json({message: 'Deu ruim - getNotificationsByReceiverId'});
    }
}

const changeNotificationToReaded = async(req, res) => {
    try {
        const notificationId = req.params.id;
        console.log(`PUT - Marcando notificação ${notificationId} como lida`);
        
        const response = await notificationModel.updateNotificationStatus(notificationId, true);
        if (response) {
            console.log('Notificação marcada como lida:', response);
            res.status(200).json({message: 'Notificação atualizada', ...response});
        } else {
            console.log('Notificação não encontrada:', notificationId);
            res.status(404).json({message: 'Notificação não encontrada'});
        }

    } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error);
        res.status(400).json({message: 'Deu ruim - changeNotificationToReaded'});
    }
}

const deleteNotification = async(req, res) => {
    try {
        const notificationId = req.params.id;
        console.log(`DELETE - Tentando deletar notificação ${notificationId}`);
        
        const response = await notificationModel.deleteNotification(notificationId);
        if (response) {
            console.log('Notificação deletada:', response);
            res.status(200).json({message: 'Notificação deletada', ...response});
        } else {
            console.log('Notificação não encontrada para deletar:', notificationId);
            res.status(404).json({message: 'Notificação não encontrada'});
        }

    } catch (error) {
        console.error('Erro ao deletar notificação:', error);
        res.status(400).json({message: 'Deu ruim - deleteNotification'});
    }
}
