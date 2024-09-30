const saveOrUpdateAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        const avatarPath = req.body.avatarId;

        // Verifica se o usuário já tem um avatar
        const existingAvatar = await avatarModel.getAvatar(userId);

        if (existingAvatar && existingAvatar.length > 0) {
            // Se o avatar já existir, faz o update
            const avatarId = await avatarModel.findIdAvatarbyPath(avatarPath);
            const result = await avatarModel.updateAvatar(avatarId[0].ID_Avatar, userId);
            res.status(200).json({ message: 'Avatar atualizado com sucesso', avatarId: avatarId[0].ID_Avatar });
        } else {
            // Se não existir, cria um novo
            const avatarId = await avatarModel.findIdAvatarbyPath(avatarPath);
            const result = await avatarModel.setAvatar(avatarId[0].ID_Avatar, userId);
            res.status(201).json({ message: 'Avatar criado com sucesso', avatarId: avatarId[0].ID_Avatar });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao salvar ou atualizar avatar' });
    }
};

