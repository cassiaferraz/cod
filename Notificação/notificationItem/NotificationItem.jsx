import fetchReadNotification from "../../../services/notifications/fetchReadNotification";
import { FaTrash } from "react-icons/fa6";
import fetchDeleteNotification from "../../../services/notifications/fetchDeleteNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationItem({ serverIP, notification, handleRead, handleDelete }) {
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(notification?.STATUS_LEITURA);
  const token = sessionStorage.getItem('token');

  const handleOnClick = async () => {
    if (!notification?.STATUS_LEITURA) {
      await handleRead(); // Chama a função de leitura do pai
      setIsRead(true); // Marca como lida no estado
    }

    if (notification.REFERENCIA?.path) {
      navigate('/' + notification.REFERENCIA.path);
    }
  };

  const handleExcludeNotification = async () => {
    console.log('Excluindo notificação...');
    await handleDelete(); // Chama a função de exclusão do pai
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
