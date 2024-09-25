Para resolver o seu problema e garantir que o avatar correto seja exibido tanto no componente de **Avatar** quanto no **BoxPerfil**, vou revisar seu código e corrigir algumas coisas para que o fluxo de atualização e exibição do avatar funcione corretamente.

Aqui estão as principais considerações e correções:

### Objetivo:
1. **Exibir o avatar correto do banco de dados, se disponível**, tanto no componente de perfil quanto no componente de avatar.
2. **Carregar a foto padrão** apenas se o usuário não tiver uma foto de perfil.
3. **Manter o avatar atualizado em todos os componentes após a mudança**.

### Passos para corrigir:

1. **useEffect no `BoxPerfil`**: Verifica se há um avatar armazenado no `sessionStorage`. Se não houver, exibe a imagem padrão.
2. **Exibir avatar atualizado**: O componente deve ouvir alterações no `sessionStorage` e atualizar o avatar sem precisar de um `refresh` na página.
3. **Otimização no fetch do avatar**: A chamada para pegar o avatar deve ser feita de forma clara e o avatar armazenado no `sessionStorage` será priorizado.

### Código Corrigido:

#### 1. **Avatar.jsx**
Esse componente é responsável por alterar e salvar o avatar do usuário.

```javascript
import React, { useState, useEffect } from 'react';
import BoxPerfil from "../BoxPerfil/BoxPerfil";
import Navmenu from '../../Navbar/Navmenu';
import AvatarSelector from './AvatarSelector';
import './Avatar.css';
import Swal from 'sweetalert2';
import BackArrow from "/img/svgs/voltar.svg";
import LogoutButton from "../../userSessions/Logout/LogoutButton";

export default function Avatar({ serverIP }) {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem('userId');
    
    if (!token) {
        window.location.href = "/";
    }

    const [avatar, setAvatar] = useState(null); // Armazena o avatar atual do usuário
    const [selectedAvatar, setSelectedAvatar] = useState(null); // Armazena o avatar selecionado pelo usuário

    // Pega o avatar atual ao carregar o componente
    useEffect(() => {
        if (token && userId) {
            fetch(`${serverIP}/avatar/get-avatar?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAvatar(data.avatarId);
                    sessionStorage.setItem('avatar', data.avatarId); // Armazena o avatar no sessionStorage
                })
                .catch(error => console.error('Erro ao buscar o avatar:', error));
        }
    }, [serverIP, token, userId]);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSaveAvatar = async () => {
        if (selectedAvatar && userId && token) {
            try {
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
                    setAvatar(selectedAvatar);
                    sessionStorage.setItem('avatar', selectedAvatar); // Atualiza o avatar no sessionStorage
                    Swal.fire({
                        icon: 'success',
                        title: 'Alterado!',
                        text: 'Avatar atualizado com sucesso!',
                    });
                } else {
                    const errorData = await response.json();
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
            <BoxPerfil serverIP={serverIP} avatar={avatar} /> {/* Passa o avatar correto para o BoxPerfil */}
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
```

#### 2. **BoxPerfil.jsx**
Aqui o avatar atual deve ser exibido e deve ser atualizado automaticamente quando o usuário muda o avatar.

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BarraProgresso from '../Progresso/BarraProgresso';
import coin from '/img/svgs/Dolar_Dinero_Moneda_1Light.svg';
import './boxperfil.css';
import usuario from '/img/svgs/avatarmasculino.png';

function BoxPerfil({ serverIP, avatar }) {
  const [nivel, setNivel] = useState('');
  const [xp, setXp] = useState('');
  const [moedas, setMoedas] = useState('');
  const [userName, setUsername] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState(usuario);

  const token = sessionStorage.getItem('token');

  // Fetch para buscar dados do usuário
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
       
