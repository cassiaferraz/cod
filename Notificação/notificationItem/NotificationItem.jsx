import fetchReadNotification from "../../../services/notifications/fetchReadNotification";
import { FaTrash } from "react-icons/fa6";
import fetchDeleteNotification from "../../../services/notifications/fetchDeleteNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationItem({ serverIP, notification, handleExclusion }) {
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(notification?.STATUS_LEITURA);
  const token = sessionStorage.getItem('token');

  const handleOnClick = async (e) => {
    if (!notification?.STATUS_LEITURA) {
      const response = await fetchReadNotification({ token, notificationId: notification?.ID_NOTIFICACAO, serverIP });
      if (!response.ok) {
        alert("Erro ao marcar notificação como lida");
      } else {
        setIsRead(true); // Marca como lida no estado
      }
    }

    if (notification.REFERENCIA?.path) {
      navigate('/' + notification.REFERENCIA.path);
    }
  };

  const handleExcludeNotification = async () => {
    console.log('Excluindo notificação...');
    const response = await fetchDeleteNotification({ token, notificationId: notification?.ID_NOTIFICACAO, serverIP });
    if (!response.ok) {
      alert('Erro ao excluir notificação');
    } else {
      handleExclusion(notification?.ID_NOTIFICACAO); // Remove a notificação da lista
    }
  };

  return (
    <div className="notification_item" style={isRead ? { color: 'var(--vivo-lightpurple50)' } : { color: 'var(--vivo-green)', fontWeight: '600' }}>
      <div className="text" onClick={handleOnClick}>
        {notification?.TEXTO}
      </div>
      <div className="actions">
        <FaTrash className="trash" onClick={handleExcludeNotification} />
      </div>
    </div>
  );
}
