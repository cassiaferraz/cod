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
