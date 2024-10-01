import usuario from '/img/svgs/avatarmasculino.png';
import BarraProgresso from '../Progresso/BarraProgresso';
import coin from '/img/svgs/Dolar_Dinero_Moneda_1Light.svg';
import notificacao from '../../../../public/img/svgs/notificacao.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../BoxPerfil/boxperfil.css';

function BoxPerfil({ serverIP, avatar }) {
  const [nivel, setNivel] = useState('');
  const [xp, setXp] = useState('');
  const [moedas, setMoedas] = useState('');
  const [userName, setUsername] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState(usuario);
  const [notificacoes, setNotificacoes] = useState([]);
  const [quantidadeNotificacoes, setQuantidadeNotificacoes] = useState(0);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${serverIP}/getUserData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        const data = await response.json();
        setUsername(data.NOME);
        setMoedas(data.MOEDAS);
        setNivel(data.NIVEL);
        setXp(data.XP);
      } catch (error) {
        console.log('Erro ao buscar os dados:', error);
      }
    }

    fetchData();
  }, [serverIP]);

  useEffect(() => {
    if (avatar) {
      setCurrentAvatar(avatar);
    } else {
      setCurrentAvatar(usuario);
    }
  }, [avatar]);

  // Novo useEffect para buscar notificações
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch(`${serverIP}/getUserNotifications`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        const notifications = await response.json();
        setNotificacoes(notifications);
        setQuantidadeNotificacoes(notifications.length);
      } catch (error) {
        console.log('Erro ao buscar notificações:', error);
      }
    }

    fetchNotifications();
  }, [serverIP, token]);

  // Função para marcar notificações como lidas
  const marcarComoLidas = async () => {
    for (const notif of notificacoes) {
      if (!notif.STATUS_LEITURA) {
        await fetch(`${serverIP}/readNotification/${notif.ID_NOTIFICACAO}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
      }
    }
    setQuantidadeNotificacoes(0); // Reseta o contador de notificações
  };

  return (
    <div>
      <Link to="/Perfil" style={{ textDecoration: 'none' }} onClick={marcarComoLidas}>
        <header className="header-perfil">
          {quantidadeNotificacoes > 0 && <span className="badge">{quantidadeNotificacoes}</span>}
          <img id="notificacao" className="notificacao" src={notificacao} alt="not" />
          <img className="icon-usuario" src={currentAvatar} alt="usuario" />
          <div className="info">
            <div className="nome-e-nivel">
              <h2 className="subinfo typing-effect">{userName}</h2>
              <h4 className="subinfo">Nível {nivel}</h4>
            </div>
            <div className='subinfo-progresso'>
              <h4 className="subinfo">EXP </h4>
              <BarraProgresso xp={xp} />
            </div>
            <div className="coin-valor">
              <img className='coin' src={coin} alt="Ícone de Moedas" />
              {moedas}
            </div>
          </div>
        </header>
      </Link>
    </div>
  );
}

export default BoxPerfil;
