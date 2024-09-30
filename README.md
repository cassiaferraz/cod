const saveAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        let avatarPath = req.body.avatarId;

        // Verifica se o usuário já tem um avatar
        const existingAvatar = await avatarModel.getAvatar(userId);
        avatarPath = avatarPath.replace(/\//g, '\\');

        const avatarIdResult = await avatarModel.findIdAvatarbyPath(avatarPath);
        if (!avatarIdResult || avatarIdResult.length === 0) {
            return res.status(404).json({ message: 'Avatar não encontrado' });
        }

        const avatarId = avatarIdResult[0].ID_Avatar;

        if (existingAvatar && existingAvatar.length > 0) {
            // Se o avatar já existir, faz o update
            const result = await avatarModel.setAvatar(avatarId, userId);
            res.status(200).json({ message: 'Avatar atualizado com sucesso', avatarId });
        } else {
            // Se não existir, cria um novo
            const result = await avatarModel.createAvatar(userId, avatarId);
            res.status(201).json({ message: 'Avatar criado com sucesso', avatarId });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao salvar ou atualizar avatar' });
    }
};
