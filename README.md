const avatarModel = require('../models/avatarModel');
const path = require('path');
const fs = require('fs');

const listAvatars = async (req, res) => {
    try {
        const avatarDir = path.join(__dirname, '..', 'assets', 'avatar');
        fs.readdir(avatarDir, (err, files) => {
            if (err) {
                console.error("Erro ao listar avatares:", err);
                return res.status(500).json({ error: 'Erro ao listar avatares' });
            }
            res.status(200).json(files);
        });
    } catch (err) {
        console.error("Erro em listAvatars:", err);
        res.status(500).json({ error: 'Erro ao listar avatares' });
    }
};

const saveAvatar = async (req, res) => {
    try {
        const userId = req.userId; 
        const { nameAvatar, avatarPath } = req.body;
        const avatarFilename = avatarPath.split('/').pop(); 
        
        await avatarModel.setAvatar (nameAvatar, avatarFilename);

        //obter o ID do avatar atualizado:
        const avatarId = await avatarModel.getAvatar(nameAvatar, avatarFilename);

        //atualizar a associação entre user e avatar:
        await avatarModel.setAvatar(userId, avatarId);

        res.status(201).json({ message: 'Avatar salvo com sucesso' });
    } catch (err) {
        console.error("Erro em saveAvatar:", err);
        res.status(500).json({ error: 'Erro ao salvar avatar no banco de dados.' });
    }
};

const fetchAvatar = async (req, res) => {
    const userId = req.userId;
    console.log('userId from token:', userId);
    try {
        if (!userId) {
            return res.status(400).json({ error: 'userId não fornecido' });
        }
        const avatar = await avatarModel.getAvatar(userId);
        if (avatar) {
            res.json(avatar);
        } else {
            res.status(404).json({ error: 'Avatar não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar o avatar:', error);
        res.status(500).json({ error: 'Erro ao buscar o avatar' });
    }
};

module.exports = { listAvatars, saveAvatar, fetchAvatar };
