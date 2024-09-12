function findRewardsRedeemed(id){
    const sql = `SELECT resg.*, rec.NOME
    FROM [ELITE].[dbo].[RECOMPENSAS_RESGATADAS] as resg
    LEFT JOIN dbo._RECOMPENSAS as rec ON rec.ID_RECOMPENSA = resg.ID_RECOMPENSA
    WHERE resg.ID_TECNICO = '${id}'`;
    const result = sqlUtils.dispatchQuery(sql);
    return result;
}
