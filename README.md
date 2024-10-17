//modell:
function deleteNotification(notificationId) {
    const sql = `
        DELETE FROM dbo.NOTIFICACOES
        WHERE ID_NOTIFICACAO = '${notificationId}'
        ;
    `
    console.log(sql)
    const response = sqlUtils.dispatchQuery(sql)
    return response
}

//controller:
const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id
        const response = await notificationModel.deleteNotification(notificationId)
        res.status(200).json({ message: 'Notificação deletada', ...response })

    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Deu ruim - deleteNotification' })
    }
}
