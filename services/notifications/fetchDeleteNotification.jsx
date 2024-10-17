
export default async function fetchDeleteNotification({token, notificationId, serverIP}) {
    try {
        console.log(`Excluindo notificação ${notificationId} no servidor ${serverIP}`);
        const response = await fetch(`${serverIP}/deleteNotification/${notificationId}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json', 
                'x-access-token': token 
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao excluir notificação:", errorText);
            return null;
        }

        return response;

    } catch(error) {
        console.error("Erro de rede:", error);
        return null;
    }
}
