import { useState, useEffect } from "react";

import { Tooltip } from 'react-tooltip'

import coin from "/img/svgs/moedaroxa.svg"
import check from "/img/svgs/check.svg"
import xmark from "/img/svgs/xmark.svg"


export default function Assiduidade({serverIP}){
    
    const [ASSIDUIDADE_ALMOX, setASSIDUIDADE_ALMOX] = useState('')
    const [ASSIDUIDADE_BANCO, setASSIDUIDADE_BANCO] = useState('')
    const [ASSIDUIDADE_ROTA, setASSIDUIDADE_ROTA] = useState('')
    const [ASSIDUIDADE_ALMOCO, setASSIDUIDADE_ALMOCO] = useState('')
    const [ASSIDUIDADE_INICIO, setASSIDUIDADE_INICIO] = useState('')
    const [DATA, setDATA] = useState('')

    const [ASSIDUIDADE_ALMOX1, setASSIDUIDADE_ALMOX1] = useState('')
    const [ASSIDUIDADE_BANCO1, setASSIDUIDADE_BANCO1] = useState('')
    const [ASSIDUIDADE_ROTA1, setASSIDUIDADE_ROTA1] = useState('')
    const [ASSIDUIDADE_ALMOCO1, setASSIDUIDADE_ALMOCO1] = useState('')
    const [ASSIDUIDADE_INICIO1, setASSIDUIDADE_INICIO1] = useState('')
    const [DATA1, setDATA1] = useState('')

    const [ASSIDUIDADE_ALMOX2, setASSIDUIDADE_ALMOX2] = useState('')
    const [ASSIDUIDADE_BANCO2, setASSIDUIDADE_BANCO2] = useState('')
    const [ASSIDUIDADE_ROTA2, setASSIDUIDADE_ROTA2] = useState('')
    const [ASSIDUIDADE_ALMOCO2, setASSIDUIDADE_ALMOCO2] = useState('')
    const [ASSIDUIDADE_INICIO2, setASSIDUIDADE_INICIO2] = useState('')
    const [DATA2, setDATA2] = useState('')

    // const ASSIDUIDADE_ALMOXnull = "null"
    // const ASSIDUIDADE_BANCOnull = "null"
    // const ASSIDUIDADE_ROTAnull = "null"
    // const ASSIDUIDADE_ALMOCOnull = "null"
    // const ASSIDUIDADE_INICIOnull = "null"

    const token = sessionStorage.getItem('token')

    useEffect(() => {

        async function pegarDadosAssiduidade(){
          try {
            const response = await fetch (`${serverIP}/avaliacao/user`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': token
              }

            })

            const data = await response.json()
            //console.log(data)
            setASSIDUIDADE_ALMOX(data[0].ASSIDUIDADE_ALMOX)
            sessionStorage.setItem('assiduidadealmox', data.ASSIDUIDADE_ALMOX)
            setASSIDUIDADE_BANCO(data[0].ASSIDUIDADE_BANCO)
            sessionStorage.setItem('assiduidadebanco', data.ASSIDUIDADE_BANCO)
            setASSIDUIDADE_ROTA(data[0].ASSIDUIDADE_ROTA)
            sessionStorage.setItem('assiduidaderota', data.ASSIDUIDADE_ROTA)
            setASSIDUIDADE_ALMOCO(data[0].ASSIDUIDADE_ALMOCO)
            sessionStorage.setItem('assiduidadealmoco', data.ASSIDUIDADE_ALMOCO)
            setASSIDUIDADE_INICIO(data[0].ASSIDUIDADE_INICIO)
            sessionStorage.setItem('assiduidadeinicio', data.ASSIDUIDADE_INICIO)
            setDATA(data[0].DATA)
            sessionStorage.setItem('assiduidadedata', data.DATA)


            setASSIDUIDADE_ALMOX1(data[1].ASSIDUIDADE_ALMOX)
            sessionStorage.setItem('assiduidadealmox1', data.ASSIDUIDADE_ALMOX)
            setASSIDUIDADE_BANCO1(data[1].ASSIDUIDADE_BANCO)
            sessionStorage.setItem('assiduidadebanco1', data.ASSIDUIDADE_BANCO)
            setASSIDUIDADE_ROTA1(data[1].ASSIDUIDADE_ROTA)
            sessionStorage.setItem('assiduidaderota1', data.ASSIDUIDADE_ROTA)
            setASSIDUIDADE_ALMOCO1(data[1].ASSIDUIDADE_ALMOCO)
            sessionStorage.setItem('assiduidadealmoco1', data.ASSIDUIDADE_ALMOCO)
            setASSIDUIDADE_INICIO1(data[1].ASSIDUIDADE_INICIO)
            sessionStorage.setItem('assiduidadeinicio1', data.ASSIDUIDADE_INICIO)
            setDATA1(data[1].DATA)
            sessionStorage.setItem('assiduidadedata1', data.DATA)
            

            setASSIDUIDADE_ALMOX2(data[2].ASSIDUIDADE_ALMOX)
            sessionStorage.setItem('assiduidadealmox2', data.ASSIDUIDADE_ALMOX)
            setASSIDUIDADE_BANCO2(data[2].ASSIDUIDADE_BANCO)
            sessionStorage.setItem('assiduidadebanco2', data.ASSIDUIDADE_BANCO)
            setASSIDUIDADE_ROTA2(data[2].ASSIDUIDADE_ROTA)
            sessionStorage.setItem('assiduidaderota2', data.ASSIDUIDADE_ROTA)
            setASSIDUIDADE_ALMOCO2(data[2].ASSIDUIDADE_ALMOCO)
            sessionStorage.setItem('assiduidadealmoco2', data.ASSIDUIDADE_ALMOCO)
            setASSIDUIDADE_INICIO2(data[2].ASSIDUIDADE_INICIO)
            sessionStorage.setItem('assiduidadeinicio2', data.ASSIDUIDADE_INICIO)
            setDATA2(data[2].DATA)
            sessionStorage.setItem('assiduidadedata2', data.DATA)

             //console.log(data)
            // co[0])
         } catch (error){
           console.log('Erro ao buscar dados',error)
           }
       }
       pegarDadosAssiduidade();
   }, [serverIP])

   // Verifica se dois ou mais valores de POSTURA sãoTRUE
  const assiduidadeAlmoco = [ASSIDUIDADE_ALMOCO, ASSIDUIDADE_ALMOCO1, ASSIDUIDADE_ALMOCO2].filter(val => val === true).length >= 2;
  const assiduidadeAlmox = [ASSIDUIDADE_ALMOX, ASSIDUIDADE_ALMOX1, ASSIDUIDADE_ALMOX2].filter(val => val === true).length >= 2;
  const assiduidadeBanco = [ASSIDUIDADE_BANCO, ASSIDUIDADE_BANCO1, ASSIDUIDADE_BANCO2].filter(val => val === true).length >= 2;
  const assiduidadeInicio = [ASSIDUIDADE_INICIO, ASSIDUIDADE_INICIO1, ASSIDUIDADE_INICIO2].filter(val => val === true).length >= 2;
  const assiduidadeRota = [ASSIDUIDADE_ROTA, ASSIDUIDADE_ROTA1, ASSIDUIDADE_ROTA2].filter(val => val === true).length >= 2;



     return(
        <div>
            <div className= "todo">
                <div  className="atributodeavaliacao">
                <h3>Assiduidade</h3>
                     +200
                    <img className= "moeda-roxa" src={coin}/>+200 EXP
                </div>
            </div>

                <div class= "todo">
                    <h5 className="atribuicao">Comparecimento Alm
                     {/* Condicional que muda a imagem baseada nos valores de ASSIDUIDADE */}
                     <img className="check" src={assiduidadeAlmox ? check : xmark} />
                    
                    </h5>
                    <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA}
                        data-tooltip-place="top">{ASSIDUIDADE_ALMOX === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ALMOX === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                    

                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA1}
                        data-tooltip-place="top">{ASSIDUIDADE_ALMOX1 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ALMOX1 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        

                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA2}
                        data-tooltip-place="top">{ASSIDUIDADE_ALMOX2 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ALMOX2 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        <Tooltip id="tooltipdata" />

                    {/* {(ASSIDUIDADE_ALMOXnull == 'null') ? <button className="null"></button> : <NotNullButton ASSIDUIDADE_ALMOX={ASSIDUIDADE_ALMOXnull}/>} */}
                </div>
                        
                <div class= "todo">
                    <h5 className="atribuicao">Horário de Almoço
                    <img className="check" src={assiduidadeAlmoco ? check : xmark} />
                    </h5>
                    <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA}
                        data-tooltip-place="top">{ASSIDUIDADE_ALMOCO === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ALMOCO === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                      
                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA1}
                        data-tooltip-place="top">{ASSIDUIDADE_ALMOCO1 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ALMOCO1 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                       
                       <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA2}
                        data-tooltip-place="top">{ASSIDUIDADE_ALMOCO2 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ALMOCO2 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        <Tooltip id="tooltipdata" />


                    {/* {(ASSIDUIDADE_ALMOCOnull == 'null') ? <button className="null"></button> : <NotNullButton ASSIDUIDADE_ALMOCO={ASSIDUIDADE_ALMOCOnull}/>} */}
                </div>

                <div class= "todo">
                    <h5 className="atribuicao">Gestão de Rota
                    <img className="check" src={assiduidadeRota ? check : xmark} />
                    </h5>
                    <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA}
                        data-tooltip-place="top">{ASSIDUIDADE_ROTA === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ROTA === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        


                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA1}
                        data-tooltip-place="top">{ASSIDUIDADE_ROTA1 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ROTA1 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        


                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA2}
                        data-tooltip-place="top">{ASSIDUIDADE_ROTA2 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_ROTA2 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        <Tooltip id="tooltipdata" />


                    {/* {(ASSIDUIDADE_ROTAnull == 'null') ? <button className="null"></button> : <NotNullButton ASSIDUIDADE_ROTA={ASSIDUIDADE_ROTAnull}/>} */}
                </div>

                <div class= "todo">
                    <h5 className="atribuicao">Banco de Horas
                    <img className="check" src={assiduidadeBanco ? check : xmark} />
                    </h5>
                    <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA}
                        data-tooltip-place="top">{ASSIDUIDADE_BANCO === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_BANCO === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                      

                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA1}
                        data-tooltip-place="top">{ASSIDUIDADE_BANCO1 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_BANCO1 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        

                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA2}
                        data-tooltip-place="top">{ASSIDUIDADE_BANCO2 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_BANCO2 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        <Tooltip id="tooltipdata" />

                    {/* {(ASSIDUIDADE_BANCOnull == 'null') ? <button className="null"></button> : <NotNullButton ASSIDUIDADE_BANCO={ASSIDUIDADE_BANCOnull}/>} */}
                </div>

                <div class= "todo">
                    <h5 className="atribuicao">Inicio Atividade
                    <img className="check" src={assiduidadeInicio ? check : xmark} />
                    </h5>
                    <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA}
                        data-tooltip-place="top">{ASSIDUIDADE_INICIO === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_INICIO === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                  

                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA1}
                        data-tooltip-place="top">{ASSIDUIDADE_INICIO1 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_INICIO1 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                     
                        <div                
                        data-tooltip-id="tooltipdata"
                        data-tooltip-content={status ? status : DATA2}
                        data-tooltip-place="top">{ASSIDUIDADE_INICIO2 === true ? (
                            <button className="finish-todo"></button>) : 
                            ASSIDUIDADE_INICIO2 === false ? 
                            (<button className="remove-todo"></button>) : 
                            (<button className="null"></button>)}</div>
                        <Tooltip id="tooltipdata" />

                    {/* {(ASSIDUIDADE_INICIOnull == 'null') ? <button className="null"></button> : <NotNullButton ASSIDUIDADE_INICIO={ASSIDUIDADE_INICIOnull}/>} */}
                </div>
        </div>
    )
}
