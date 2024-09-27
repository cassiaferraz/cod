const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../config/dbConfig');

async function dispatchQuery(sqlString){
    try { 
        const connection = await sql.connect(dbConfig);
        var request = new sql.Request();
        const result = await request.query(sqlString);
        return result.recordset;
    } catch(err) {
        console.log('\n ------------------ erro na requisição ------------ \n\n')
        console.log(err)
        console.log('\n\n ------------------ erro na requisição ------------ \n')
    }
}

module.exports = {
    dispatchQuery
}
