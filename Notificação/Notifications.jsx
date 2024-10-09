import { useEffect, useState, useRef } from 'react';
import './notification.css';
import notification_foto from '../../../public/img/svgs/notificacao.svg';
import NotificationItem from './notificationItem/NotificationItem';
import fetchUserNotifications from '../../services/notifications/fetchUserNotifications';
import fetchDeleteNotification from '../../services/notifications/fetchDeleteNotification';
import fetchReadNotification from '../../services/notifications/fetchReadNotification';
import React from 'react';

export default function Notifications({ notification, serverIP }) {
  const divRef = useRef(null);
  const token = sessionStorage.getItem('token');
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [notifications, setNotifications] = useState(notification);

  const handleClickOutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleReadNotification = async (notificationId) => {
    const response = await fetchReadNotification({ token, notificationId, serverIP });
    if (response && response.ok) {
      console.log(`Notificação ${notificationId} marcada como lida.`);
      removeNotificationFromList(notificationId); // Atualiza o estado
    } else {
      console.error('Erro ao marcar notificação como lida.');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    const response = await fetchDeleteNotification({ token, notificationId, serverIP });
    if (response && response.ok) {
      console.log(`Notificação ${notificationId} excluída.`);
      removeNotificationFromList(notificationId); // Remove do estado
    } else {
      console.error('Erro ao excluir a notificação.');
    }
  };

  const removeNotificationFromList = (notificationId) => {
    let aux = [...notifications];
    aux = aux.filter((not) => not.ID_NOTIFICACAO !== notificationId);
    setNotifications(aux);
  };

  return (
    <div className='notifications_menu' ref={divRef}>
      <div className='notification_icon' onClick={() => setIsMenuOpened((prev) => !prev)}>
        <img src={notification_foto} />
        {notifications?.length > 0 ? <div className='notification_number'>{notifications.length}</div> : ''}
      </div>
      <div className='notifications_dropdown' style={isMenuOpened ? {} : { display: 'none' }}>
        <div className='arrow'></div>
        {notifications?.length > 0 ? (
          notifications.map((item, index) => (
            <React.Fragment key={`notification_${item?.TEXTO}_${index}`}>
              <NotificationItem
                notification={item}
                handleRead={() => handleReadNotification(item.ID_NOTIFICACAO)} // Passa a função de leitura
                handleDelete={() => handleDeleteNotification(item.ID_NOTIFICACAO)} // Passa a função de exclusão
                serverIP={serverIP} // Passa o serverIP para o componente filho
              />
              {index !== notifications.length - 1 ? <div className='division'></div> : ''}
            </React.Fragment>
          ))
        ) : (
          'Sem notificações pendentes'
        )}
      </div>
    </div>
  );
}
