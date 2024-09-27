import React, { createContext, useContext, useState } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};

export const useAvatar = () => {
    return useContext(AvatarContext);
};

\\routes
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AvatarProvider } from './AvatarContext'; // Ajuste o caminho conforme necessário

ReactDOM.render(
    <AvatarProvider>
        <App />
    </AvatarProvider>,
    document.getElementById('root')
);


\\avatar.jsx
import React, { useEffect } from 'react';
import { useAvatar } from './AvatarContext'; // Ajuste o caminho conforme necessário

export default function Avatar({ serverIP }) {
    const { setAvatar } = useAvatar();
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        if (token) {
            fetch(`${serverIP}/avatar/get-avatar?userId=${userId}`, {
                headers: { 'x-access-token': token }
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar o avatar');
                return response.json();
            })
            .then(data => {
                if (data && data.avatarPath) {
                    setAvatar(data.avatarPath); // Armazene no contexto
                }
            })
            .catch(error => console.error('Erro ao buscar o avatar:', error));
        }
    }, [serverIP, token, setAvatar]);

    return (
        // Seu JSX aqui
    );
}

\\\OUTROSCOMPONENTES:
import { useAvatar } from './AvatarContext'; // Ajuste o caminho conforme necessário

const SomeComponent = () => {
    const { avatar } = useAvatar();

    return (
        <img src={avatar || '/img/svgs/avatarmasculino.png'} alt="Avatar" />
    );
};
