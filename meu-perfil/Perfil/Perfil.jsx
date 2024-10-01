import Navmenu from "../../Navbar/Navmenu"
import Habilidades from '../Habilidades/Habilidades'
import BoxPerfil from "../BoxPerfil/BoxPerfil"
import { useAvatar } from "../../Context/AvatarContext"
import { Tooltip } from 'react-tooltip'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import '../Perfil/perfil.css'
import Ajustes from '/img/svgs/Ajustes.svg'
import Premio from '/img/svgs/Premio.svg'



function Perfil({ serverIP }) {

    const { avatar } = useAvatar();
    const token = sessionStorage.getItem("token")
    console.log(token)
    if (!token) {
        window.location.href = "/";
    }


    const [medalsTechnician, setmedalsTechnician] = useState([])



    useEffect(() => {

        async function getMedals() {
            try {
                const response = await fetch(`${serverIP}/Medalhas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token

              }
            })
 
            const data = await response.json()
            setmedalsTechnician(data.medalsTechnician)

            console.log(data)
          
         } catch (error){
           console.log('Erro ao buscar dados',error)
           }
       }
       getMedals({serverIP});
 
   }, [serverIP]);
 
 
    return (

        <div className="todocontainer">
            <Navmenu />
            <BoxPerfil serverIP={serverIP} avatar={avatar}/>

            <div id="titulo-config">
                <h2 className="titulodapagina">Meu Perfil</h2>
                <div id="config">
                    <Link to="/Config"
                        data-tooltip-id="nomeItem"
                        data-tooltip-content={status ? status : 'Configurações'}
                        data-tooltip-place="top">
                        <img src={Ajustes} alt="config" />
                    </Link> <Tooltip id="config" />
                </div>
            </div>
            <Habilidades serverIP={serverIP} />


            <div className="tabela-medalhas-recompensas">

                <div className="cabecalho-medalhas"><p>Medalhas</p></div>

                <div className="medalhas-geral">
                {medalsTechnician.length === 0 ? (
                        <p className="ValueNull"><strong>Nenhuma medalha atribuida no momento.</strong></p>
                    ) : (
                medalsTechnician.map((medal, index) => (

                    <div key={index} className="medalhas-adquiridas">
                        <div className="coluna-medalhas"
                            data-tooltip-id="nomeItem"
                            data-tooltip-content={status ? status : medal.DESCRICAO_MEDALHA}
                            data-tooltip-place="top">
                            <img className="icon-medalhas-perfil" src={Premio} />
                            <Tooltip id="medal" />
                            <h4>{medal.NOME_MEDALHA}</h4>
                            <p></p>
                        </div>

                    </div>

                ))
                    )}
                </div>
            </div>




        </div>
    )
}

export default Perfil