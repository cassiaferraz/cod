import usuario from '/img/svgs/avatarmasculino.png';
import BarraProgresso from '../Progresso/BarraProgresso';
import coin from '/img/svgs/Dolar_Dinero_Moneda_1Light.svg';
import notificacao from '../../../../public/img/svgs/notificacao.svg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../BoxPerfil/boxperfil.css';

function BoxPerfil({ serverIP, avatar }) {
  const [nivel, setNivel] = useState('');
  const [xp, setXp] = useState('');
  const [moedas, setMoedas] = useState('');
  const [userName, setUsername] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState(usuario); // Avatar padrão

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
        sessionStorage.setItem('username', data.NOME);
        setMoedas(data.MOEDAS);
        sessionStorage.setItem('usermoedas', data.MOEDAS);
        setNivel(data.NIVEL);
        sessionStorage.setItem('usernivel', data.NIVEL);
        setXp(data.XP);
        sessionStorage.setItem('userxp', data.XP);
      } catch (error) {
        console.log('Erro ao buscar os dados:', error);
      }
    }

    fetchData();
  }, [serverIP]);

  useEffect(() => {
    // Atualiza o avatar com base no que vem do props
    if (avatar) {
      setCurrentAvatar(avatar);
    } else {
      setCurrentAvatar(usuario); 
    }
  }, [avatar]);

  return (
    <div>
      <Link to="/Perfil" style={{ textDecoration: 'none' }}>
        <header className="header-perfil">
          <img id= "notificacao" src={notificacao} alt="not" />
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
