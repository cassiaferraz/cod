import { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import Navmenu from '../Navbar/Navmenu'
import LogoutButton from '../userSessions/Logout/LogoutButton'
import React from 'react'
import { useAvatar } from '../Context/AvatarContext'

import '../Desafios/desafios.css'
import "../Navbar/navmenu.css"

import BoxPerfil from '../meu-perfil/BoxPerfil/BoxPerfil'

import coin from "/img/svgs/moedaroxa.svg"
import check from "/img/svgs/check.svg" 
import AlvoDesafios from "/img/svgs/AlvoDesafios.webp" 


export default function Desafios ({serverIP}) {
    const { avatar } = useAvatar();
    const token = sessionStorage.getItem("token")
    if(!token) {
        window.location.href = "/";
    }

    const [incompleteChallenges, setIncompleteChallenges] = useState([]);
    const [completedChallenges, setCompletedChallenges] = useState([]);

    useEffect(() => {
        async function pegarDadosDesafios(){
            try {
                const response = await fetch (`${serverIP}/Challenge`, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                })

                const data = await response.json()
                setIncompleteChallenges(data.incompleteChallenges || [])
                setCompletedChallenges(data.completedChallenges || [])

            } catch (error){
                console.log('Erro ao buscar dados', error)
            }
        }
        pegarDadosDesafios();
    }, [serverIP, token])

    return (
        <div className="todocontainer">
            <Navmenu />
            <BoxPerfil serverIP={serverIP} avatar={avatar}/>

            <div id="pag-desafios">
                <div id="sair-app">
                    <h2 className="titulodapagina">Meus Desafios</h2>
                    <img className="alvodesafios" src={AlvoDesafios} />
                    <LogoutButton />
                </div>

                <div className='coluna-tabela-desafios'>
                    <li>Desafios</li>
                    <li>Moedas</li>
                    <li>XP</li>
                </div>

                <div className='corpodatabela-desafios'>
                    {incompleteChallenges.length === 0 ? (
                        <p><strong>Não há desafios atribuídos.</strong></p>
                    ) : (
                        incompleteChallenges.map((challenge, index) => (
                            <React.Fragment key={`challenge_${index}`}>
                                <div key={index} className='linha-tabela-desafios'>
                                    <h4 
                                        data-tooltip-id="nomeItem"
                                        data-tooltip-content={challenge.STATUS ? challenge.NOME : ""}
                                        data-tooltip-place="top">
                                        {challenge.NOME}
                                    </h4>
                                    <Tooltip id="nomeItem" />
                                    <div>
                                        <p>{challenge.MOEDAS}<img className="moeda-roxa" src={coin} /></p>
                                    </div>
                                    <div>
                                        <p>{challenge.XP} EXP</p>
                                    </div>
                                </div>

                                <div>
                                    <p>{challenge.DESCRICAO}</p>
                                </div>
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>

            <div id="pag-desafios">
                <div id="sair-app">
                    <h2 className="titulodapagina">Desafios Concluídos</h2>
                    <img className="checkdesafios" src={check} />
                </div>

                <div className='coluna-tabela-desafios'>
                    <li>Desafios</li>
                    <li>Moedas ganhas</li>
                    <li>XP ganho</li>
                </div>

                <div className='corpodatabela-desafios'>
                    {completedChallenges.length === 0 ? (
                        <p><strong>Não há desafios completados.</strong></p>
                    ) : (
                        completedChallenges.map((challenge, index) => (
                            <React.Fragment key={`challengeComplete_${index}`}>
                                <div key={index} className='linha-tabela-desafios'>
                                    <h4 
                                        data-tooltip-id="nomeItem"
                                        data-tooltip-content={challenge.STATUS ? challenge.NOME : ""}
                                        data-tooltip-place="top">
                                        {challenge.NOME}
                                    </h4>
                                    <Tooltip id="nomeItem" />
                                    <div>
                                        <p>{challenge.MOEDAS}<img className="moeda-roxa" src={coin} /></p>
                                    </div>
                                    <div>
                                        <p>{challenge.XP} EXP</p>
                                    </div>
                                </div>

                                <div> 
                                    <p>{challenge.DESCRICAO}</p>
                                </div>
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}