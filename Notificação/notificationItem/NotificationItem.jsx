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
