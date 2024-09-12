
const sqlServer = require('../utils/sqlServer');

async function createAvatar(nameAvatar, avatarFilename) {
    console.log('execuando create');
    console.log('nameAvatar:', nameAvatar);
    console.log('avatarFilename:', avatarFilename);
    
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
    console.log('execuando getavatar');
    console.log('userid:', userId);

    const sql = `
        SELECT U.avatarPath 
        FROM UserAvatars U
        JOIN AVATAR_do_COLABORADOR A ON U.ID_Avatar = A.ID_Avatar
        WHERE A.ID_COLABORADOR = '${userId}'
    `;
    const [result] = await sqlServer.dispatchQuery(sql);
    return result ? result.avatarPath : null;
}


async function setAvatar(userId, avatarId) {
    const sql = `
        INSERT INTO AVATAR_do_COLABORADOR (ID_COLABORADOR, ID_Avatar)
        VALUES ('${userId}', '${avatarId}')
        ON DUPLICATE KEY UPDATE ID_Avatar = VALUES(ID_Avatar)
    `;
    await sqlServer.dispatchQuery(sql);
}

module.exports = {
    createAvatar,
    getAvatar,
    setAvatar
};



 ------------------ erro na requisição ------------

avatar salvo no banco de dados
userId from token: 3547233
execuando getavatar
userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png
userId from token: 3547233
execuando getavatar
userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png

userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png
userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png
userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png

userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png
userid: 3547233
avatar obtido do banco de dados: \public\avatar\Avatar12.png


