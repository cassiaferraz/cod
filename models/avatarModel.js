
const sqlServer = require('../utils/sqlServer');

async function createAvatar(nameAvatar, avatarFilename) {
    const sql = `
        INSERT INTO UserAvatars (nameAvatar, avatarPath)
        VALUES ('${nameAvatar}', '${avatarFilename}')
        ON DUPLICATE KEY UPDATE
        nameAvatar = VALUES(nameAvatar),
        avatarPath = VALUES(avatarPath)
    `;
    await sqlServer.dispatchQuery(sql);
}

async function getAvatar(userId) {
    const sql = `
        SELECT U.AVATARPATH 
        FROM UserAvatars U
        JOIN avatar_do_colaborador A ON U.ID_AVATAR = A.ID_AVATAR
        WHERE A.ID_COLABORADOR = '${userId}'
    `;
    const [result] = await sqlServer.dispatchQuery(sql);
    return result ? result.AVATARPATH : null;
}

async function setAvatar(userId, avatarId) {
    const sql = `
        INSERT INTO avatar_do_colaborador (ID_COLABORADOR, ID_AVATAR)
        VALUES ('${userId}', '${avatarId}')
        ON DUPLICATE KEY UPDATE ID_AVATAR = VALUES(ID_AVATAR)
    `;
    await sqlServer.dispatchQuery(sql);
}

module.exports = {
    createAvatar,
    getAvatar,
    setAvatar
};





// const sqlServer = require('../utils/sqlServer');

// async function createOrUpdateAvatar(userId, nameAvatar, avatarFilename) {
//     const sql = `INSERT INTO UserAvatars (ID_COLABORADOR, nameAvatar, avatarPath) 
//                  VALUES ('${userId}', '${nameAvatar}', '${avatarFilename}')
//                  ON DUPLICATE KEY UPDATE nameAvatar = '${nameAvatar}', avatarPath = '${avatarFilename}'`;
//     const results = await sqlServer.dispatchQuery(sql);
//     return results;
// }

// async function getAvatar(userId) {
//     const sql = `SELECT nameAvatar, avatarPath FROM UserAvatars WHERE ID_COLABORADOR = '${userId}'`;
//     try {
//         const results = await sqlServer.dispatchQuery(sql);
//         console.log('Resultados da consulta:', results);
//         return results[0] || {}; 
//     } catch (error) {
//         console.error('Erro na consulta SQL:', error);
//         throw error;
//     }
// }

// async function setAvatar(userId, avatarPath) {
//     const sql = `UPDATE UserAvatars 
//                  SET avatarPath = '${avatarPath}' 
//                  WHERE ID_COLABORADOR = '${userId}'`;
//     const results = await sqlServer.dispatchQuery(sql);
//     return results;
// }

// module.exports = {
//     createOrUpdateAvatar,
//     getAvatar,
//     setAvatar
// };