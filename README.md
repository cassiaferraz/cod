const saveAvatar = async (req, res) =>
     { try
         { const userId = req.userId; 
           let avatarPath = req.body.avatarId;

    // Verifica se o usuário já tem um avatar
    const existingAvatar = await avatarModel.getAvatar(userId);
        avatarPath = avatarPath.replace(/\//g, '\\')

    if (existingAvatar && existingAvatar.length > 0) {
        // Se o avatar já existir, faz o update
        const avatarId = await avatarModel.findIdAvatarbyPath(avatarPath);
        const result = await avatarModel.setAvatar(avatarId[0].ID_Avatar, userId);
        res.status(200).json({ message: 'Avatar atualizado com sucesso', avatarId: avatarId[0].ID_Avatar });
    } else {
        // Se não existir, cria um novo
        console.log(userId)
        console.log(avatarId)
        const avatarId = await avatarModel.findIdAvatarbyPath(avatarPath);
        const result = await avatarModel.createAvatar(avatarId[0].ID_Avatar, userId);
        res.status(201).json({ message: 'Avatar criado com sucesso', avatarId: avatarId[0].ID_Avatar });
    }
} catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erro ao salvar ou atualizar avatar' });
}
}

// model: 

const sqlServer = require('../utils/sqlServer');

async function createAvatar(userId, avatarId) {
    //console.log('execuando create');

        const sql = `INSERT INTO dbo.AVATAR_do_COLABORADOR (ID_COLABORADOR, ID_Avatar) 
        VALUES ( '${userId}', '${avatarId}')`;
        const params = { userId, avatarId };
        const results = await sqlServer.dispatchQuery(sql, params);
        return results;
}


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

async function getAvatarDetails(avatarId) {
    const sql = `SELECT avatarPath FROM UserAvatars WHERE ID_Avatar = '${avatarId}'`;
    const results = await sqlServer.dispatchQuery(sql);
    return results;
}

module.exports = {
    createAvatar,
    getAvatar,
    setAvatar,
    getAvatarDetails,
    findIdAvatarbyPath
};


