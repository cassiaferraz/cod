const sqlServer = require('../utils/sqlServer');

async function createAvatar(data) {
    console.log('execuando create');

        const sql = `INSERT INTO dbo.AVATAR_do_COLABORADOR (ID_COLABORADOR, ID_Avatar) 
        VALUES ( '${data.userId}', '${data.avatarId}')`;
        const result = sqlServer.dispatchQuery(sql);
        return result;

}

// async function getAvatar(avatarId, userId) {
//     const sql = `
//         SELECT U.ID_Avatar, U.nameAvatar, U.avatarPath
//         FROM UserAvatars U
//         LEFT JOIN AVATAR_do_COLABORADOR A ON U.ID_Avatar = '${avatarId}'
//         WHERE A.ID_COLABORADOR = '${userId}'
//     `;
//     const params = {avatarId, userId };
//     const result = await sqlServer.dispatchQuery(sql, params);
//     return result;
// }

async function getAvatar(userId) {
    const sql = `SELECT ID_Avatar FROM dbo.AVATAR_do_COLABORADOR WHERE ID_COLABORADOR = '${userId}'`
    //const params = { avatarId, userId };
    const results = await sqlServer.dispatchQuery(sql);
    return results;
}

async function setAvatar(avatarId, userId) {
    const sql = `UPDATE dbo.AVATAR_do_COLABORADOR SET ID_Avatar = '${avatarId}' WHERE ID_COLABORADOR = '${userId}'`;
    const params = { avatarId, userId };
    const results = await sqlServer.dispatchQuery(sql, params);
    return results;
}  

async function findIdAvatarbyPath(avatarPath) {
    const sql = `SELECT ID_Avatar FROM dbo.UserAvatars WHERE avatarPath = '${avatarPath}'`
    const results = await sqlServer.dispatchQuery(sql);
    return results;
}

module.exports = {
    createAvatar,
    getAvatar,
    setAvatar,
    findIdAvatarbyPath
};


