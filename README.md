import React, { useState, useEffect } from 'react';
import BoxPerfil from "../BoxPerfil/BoxPerfil";
import Navmenu from '../../Navbar/Navmenu';
import AvatarSelector from './AvatarSelector';
import './Avatar.css';
import Swal from 'sweetalert2';

export default function Avatar({ serverIP }) {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/";
    }

    const [avatar, setAvatar] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetch(`${serverIP}/get-avatar?userId=${userId}`, {
                headers: {
                    'x-access-token': token // Adiciona o token, se necessário
                }
            })
                .then(response => response.json())
                .then(data => setAvatar(data.avatarPath))
                .catch(error => console.error('Erro ao buscar o avatar:', error));
        } else {
            console.error('User ID não encontrado no sessionStorage');
        }
    }, [serverIP, userId, token]);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSaveAvatar = async () => {
        if (!selectedAvatar) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Nenhum avatar selecionado.',
            });
            return;
        }

        if (!userId) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'ID do usuário não encontrado.',
            });
            return;
        }

        try {
            const response = await fetch(`${serverIP}/set-avatar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({ userId, avatarPath: selectedAvatar })
            });

            if (response.ok) {
                setAvatar(selectedAvatar);
                sessionStorage.setItem('avatar', selectedAvatar);
                Swal.fire({
                    icon: 'success',
                    title: 'Alterado!',
                    text: 'Avatar atualizado com sucesso!',
                });
            } else {
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
    };

    return (
        <div className="todocontainer">
            <BoxPerfil serverIP={serverIP} avatar={avatar} />
            <Navmenu />
            <div className='header-avatar'>
                <h1>Selecione seu Avatar</h1>
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
