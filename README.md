
//avatar.jsx:


import React, { useState, useEffect } from 'react';
import BoxPerfil from "../BoxPerfil/BoxPerfil";
import Navmenu from '../../Navbar/Navmenu';
import AvatarSelector from './AvatarSelector';
import './Avatar.css';
import Swal from 'sweetalert2';
import BackArrow from "/img/svgs/voltar.svg";
import LogoutButton from "../../userSessions/Logout/LogoutButton"

export default function Avatar({ serverIP }) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem('userId');
    
    if (!token) {
        window.location.href = "/";
    }

    const [avatar, setAvatar] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
 
    useEffect(() => {


        if (token) {
            //console.log('Fetching avatar');
            fetch(`${serverIP}/avatar/get-avatar?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar o avatar');
                    }
                    return response.json();
                })
                .then(data => setAvatar(data.avatarId))
                .catch(error => console.error('Erro ao buscar o avatar:', error));
        } else {
            console.error('user id não encontrado no sessionStorage');
        }
    }, [serverIP, token]);

    
    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSaveAvatar = async () => {
        if (selectedAvatar && userId && token) {
            try {
                //console.log('Dados enviados para o servidor:', {userId, avatarId:selectedAvatar});
                const response = await fetch(`${serverIP}/avatar/set-avatar`, {
                    
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify({ userId: userId, avatarId: selectedAvatar })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('resposta:', data);
                    setAvatar(selectedAvatar);
                    sessionStorage.setItem('avatar', selectedAvatar);
                    //console.log('avatar salvo no localstorage', selectedAvatar)
                    Swal.fire({
                        icon: 'success',
                        title: 'Alterado!',
                        text: 'Avatar atualizado com sucesso!',
                    });
                } else {
                    const errorData = await response.json();
                    console.log('erro na resposta:',errorData);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: `Erro ao atualizar o avatar: ${response.statusText}`,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: `Erro ao atualizar o avatar: ${error.message}`,
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'User ID ou token não encontrado. Por favor, faça login novamente.',
            });
        }
    };

    return (
        <div className="todocontainer">
            <BoxPerfil serverIP={serverIP} avatar={avatar} />
            <Navmenu />
            <div className='header-avatar'>
            <div id="sair-app">
                <a href="/perfil">
                    <img
                        className="btn-backPage"
                        src={BackArrow}
                        alt="Voltar"
                    />
                </a>
                    <h2 id="titulopagina">Selecione seu Avatar</h2>
                    <LogoutButton></LogoutButton>
                </div>

                <div className='avatares-options'>
                    <AvatarSelector onSelect={handleAvatarSelect} />
                    {selectedAvatar && <p>Avatar Selecionado: {selectedAvatar.split('/').pop().replace('.png', '')}</p>}
                </div>
                <button className='alterar-avatar' onClick={handleSaveAvatar}>
                    Alterar Avatar
                </button>
            </div>
        </div>
    );
}

//boxperfil: import usuario from '/img/svgs/avatarmasculino.png';
import BarraProgresso from '../Progresso/BarraProgresso';
import coin from '/img/svgs/Dolar_Dinero_Moneda_1Light.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../BoxPerfil/boxperfil.css';


function BoxPerfil({ serverIP, avatar }) {
  const [nivel, setNivel] = useState('');
  const [xp, setXp] = useState('');
  const [moedas, setMoedas] = useState('');
  const [userName, setUsername] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState(usuario);

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
    const handleStorageChange = (event) => {
      if (event.key === 'avatar') {
        setCurrentAvatar(event.newValue || usuario);
        //console.log('avatar atualizado no storage', event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const storedAvatar = sessionStorage.getItem('avatar');
    if(storedAvatar){
      setCurrentAvatar(storedAvatar);
      //console.log('avatar inicial do localstorage')
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Link to="/Perfil" style={{ textDecoration: 'none' }}>
        <header className="header-perfil">
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
