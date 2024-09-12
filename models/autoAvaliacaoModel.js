const sqlServer = require('../utils/sqlServer');
 
 
// Função de validação e conversão
function validateAndConvertValue(value) {
    if (value === undefined || value === null || value === NaN ) {
      console.log(value)
       
        return 0; 
    }
     return value;
}

// const StrID = ParseString(habilidade)


//CREATE
function createHabilidade(habilidade) {
    const ID_COLABORADOR = validateAndConvertValue(habilidade.ID_COLABORADOR);
    const CONECTIVIDADE = validateAndConvertValue(habilidade.CONECTIVIDADE);
    const CASA_INTELIGENTE = validateAndConvertValue(habilidade.CASA_INTELIGENTE);
    const ELETRICA = validateAndConvertValue(habilidade.ELETRICA);
    const AUDIO_VIDEO = validateAndConvertValue(habilidade.AUDIO_VIDEO);
    const PABX_VOIP = validateAndConvertValue(habilidade.PABX_VOIP);
    const METALICO = validateAndConvertValue(habilidade.METALICO);
    const DATA = habilidade.DATA;
 
    const sqlQuery = `INSERT INTO dbo._HABILIDADES
        (ID_COLABORADOR, CONECTIVIDADE, CASA_INTELIGENTE, ELETRICA, AUDIO_VIDEO, PABX_VOIP, METALICO, DATA)
        VALUES ('${ID_COLABORADOR}', ${CONECTIVIDADE}, ${CASA_INTELIGENTE}, ${ELETRICA}, ${AUDIO_VIDEO}, ${PABX_VOIP}, ${METALICO}, CONVERT(datetime, '${DATA}', 120))`;
 
     const results = sqlServer.dispatchQuery(sqlQuery)
     return results
}

//READ
function countAvaliacoesMesAtual(id, today) {
    const sqlQuery = `
    SELECT COUNT(*) AS TOTAL
    FROM _HABILIDADES 
    WHERE ID_COLABORADOR = '${id}' AND CONVERT(DATE, DATA , 120) = '${today}'
    `;
    return sqlServer.dispatchQuery(sqlQuery);
}


 
module.exports = {
    createHabilidade,
    countAvaliacoesMesAtual

}