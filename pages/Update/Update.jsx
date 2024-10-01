import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import "./register_style.css"

import BackArrow from "/img/svgs/voltar.svg"

import UpdateForm from '../../userSessions/UpdateForm/UpdateForm';

function Update({serverIP}) {

    return (

        <div className='body-container'>

            <div className="register-container">
              
                <Link to= "/missoes"> <img 
                        className="btn-backPage"
                        src={BackArrow} 
                        alt="Voltar"
                        /> </Link>
               
                <div className='subtitulo-cadastro'>

                </div>
                <UpdateForm serverIP={serverIP}/>

            </div>
        </div>
    );
}

export default Update;
