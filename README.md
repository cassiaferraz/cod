import './logout.css'

import React from 'react';

const handleLogout = () => {
    
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('userId'); 

    //sessionStorage.removeItem('avatar'); 

    window.location.href = '/'; 
};

function LogoutButton () {

    return (
        <button className= "logout" onClick={handleLogout}>Sair</button>
    );
};

export default LogoutButton;
