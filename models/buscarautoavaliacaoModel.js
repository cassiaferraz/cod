const sqlServer = require('../utils/sqlServer');
 

 
//AUTO AVALIACAO
function getUser(id) {
    const sql = `SELECT CONECTIVIDADE, CASA_INTELIGENTE, METALICO, ELETRICA, PABX_VOIP, AUDIO_VIDEO FROM dbo._HABILIDADES WHERE ID_COLABORADOR = '${id}'
    ORDER BY DATA DESC;`;
    const results = sqlServer.dispatchQuery(sql);
    return results;
}  



//AVALIACAO SUGERIDA
function getUserSugerida(id) {
    const sql = `SELECT CONECTIVIDADE, CASA_INTELIGENTE, METALICO, ELETRICA, PABX_VOIP, AUDIO_VIDEO FROM dbo._HABILIDADES_TECNICOS_SUGERIDO WHERE ID_TECNICO = '${id}'
    ORDER BY DATA DESC;`;
    const results = sqlServer.dispatchQuery(sql);
    return results;
}  
 

 

/*
    C
    R
    U
    D
*/
 
 
module.exports = {
    getUser,
    getUserSugerida
 
}