import Navmenu from "../Navbar/Navmenu"
import '../meu-perfil/Perfil/Perfil'
import BoxPerfil from "../meu-perfil/BoxPerfil/BoxPerfil"

import Laudos from "./Laudos"
import Postura from "./Postura"
import Veiculo from "./Veiculo"
import Assiduidade from "./Assiduidade"

import coin from "/img/svgs/moedaroxa.svg"
import check from "/img/svgs/check.svg" 
import xmark from "/img/svgs/xmark.svg" 

import { useState, useEffect, useContext} from 'react'

import '../Missoes/missoes.css'
import '../pages/pages.css'
import LogoutButton from "../userSessions/Logout/LogoutButton"
import { Tooltip } from 'react-tooltip'
import { useAvatar } from '../../components/Context/AvatarContext'; 


export default function Missoes({ serverIP}) {

    const { avatar } = useAvatar();
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/";
    }

    // const [TDNA, setTDNA] = useState('');
    // const [IFI, setIFI] = useState('');
    // const [IRR, setIRR] = useState('');
    const [FISCALIZACAO, setFISCALIZACAO] = useState('');
    const [DATA, setDATA] = useState('');
    const [FISCALIZACAO1, setFISCALIZACAO1] = useState('');
    const [DATA1, setDATA1] = useState('');
    const [FISCALIZACAO2, setFISCALIZACAO2] = useState('');
    const [DATA2, setDATA2] = useState('');

    // useEffect(() => {
    //     async function pegarDadosQualidade() {
    //         try {
    //             const response = await fetch(`${serverIP}/indicadores`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-access-token': token
    //                 }
    //             });
    //             const data = await response.json();
    //             setTDNA(data[0].TDNA);
    //             sessionStorage.setItem('usertdna', data.TDNA);
    //             setIFI(data[0].IFI);
    //             sessionStorage.setItem('userifi', data.IFI);
    //             setIRR(data[0].IRR);
    //             sessionStorage.setItem('userirr', data.IRR);
    //         } catch (error) {
    //             console.log('Erro ao buscar dados', error);
    //         }
    //     }
    //     pegarDadosQualidade();
    // }, [serverIP]);

    useEffect(() => {
        async function pegarDadosFiscalizacao() {
            try {
                const response = await fetch(`${serverIP}/avaliacao/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });
                const data = await response.json();
                setFISCALIZACAO(data[0].FISCALIZACAO);
                setDATA(data[0].DATA);
                setFISCALIZACAO1(data[1].FISCALIZACAO);
                setDATA1(data[1].DATA);
                setFISCALIZACAO2(data[2].FISCALIZACAO);
                setDATA2(data[2].DATA);
            } catch (error) {
                console.log('Erro ao buscar dados', error);
            }
        }
        pegarDadosFiscalizacao();
    }, [serverIP]);

    // Verifica se dois ou mais valores de fiscalização são TRUE
    const fiscalizacaoOk = [FISCALIZACAO, FISCALIZACAO1, FISCALIZACAO2].filter(val => val === true).length >= 2;


    return (
        <>
        
            <Navmenu serverIP={serverIP} />
            <div className="todocontainer">
                <BoxPerfil serverIP={serverIP} avatar={avatar} />
                <div id="paginamissoes">
                    <h2 className="titulodapagina">Missões</h2>
                    <LogoutButton />
                </div>

                <Laudos serverIP={serverIP} />
                <div className="todo">
                    <div className="atributodeavaliacao">
                        <h3>Qualidade</h3>
                        +100
                        <img className="moeda-roxa" src={coin} />+100 EXP
                    </div>
                </div>

                {/* <div className="todo">
                  <h5 className="atribuicao">TDNA: <img className="xmark" src={xmark}/>
                    <QualityProgressIcon value={TDNA} realMax="5" referenceValue="5" /></h5>
              </div>
              <div className="todo">
                  <h5 className="atribuicao">IFI: <img className="xmark" src={xmark}/> 
                  <QualityProgressIcon value={IFI} referenceValue="1" percent="true" style={{ backgroundColor: IFI >= 1 ? 'blue' : 'yellow' }} /></h5>
              </div>
              <div className="todo">
                  <h5 className="atribuicao">IRR: <img className="xmark" src={xmark}/> 
                  <QualityProgressIcon value={IRR} referenceValue="1" percent="true" /></h5>
              </div> */}

                <div className="todo">
                    <h5 className="atribuicao">Fiscalização
                        {/* Condicional que muda a imagem baseada nos valores de FISCALIZACAO */}
                        <img className="check" src={fiscalizacaoOk ? check : xmark} />
                    </h5>

                    <div data-tooltip-id="tooltipdata" data-tooltip-content={DATA} data-tooltip-place="top">
                        {FISCALIZACAO === true ? (<button className="finish-todo"></button>) :
                            FISCALIZACAO === false ? (<button className="remove-todo"></button>) :
                                (<button className="null"></button>)}
                    </div>

                    <div data-tooltip-id="tooltipdata" data-tooltip-content={DATA1} data-tooltip-place="top">
                        {FISCALIZACAO1 === true ? (<button className="finish-todo"></button>) :
                            FISCALIZACAO1 === false ? (<button className="remove-todo"></button>) :
                                (<button className="null"></button>)}
                    </div>

                    <div data-tooltip-id="tooltipdata" data-tooltip-content={DATA2} data-tooltip-place="top">
                        {FISCALIZACAO2 === true ? (<button className="finish-todo"></button>) :
                            FISCALIZACAO2 === false ? (<button className="remove-todo"></button>) :
                                (<button className="null"></button>)}
                    </div>

                    <Tooltip id="tooltipdata" />
                </div>
                <Postura serverIP={serverIP} />
                <Veiculo serverIP={serverIP} />
                <Assiduidade serverIP={serverIP} />
            </div>
        </>
    );
}