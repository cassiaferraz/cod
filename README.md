const avatarModel = require('../models/avatarModel');
const path = require('path');
const fs = require('fs');

const createAvatar = async (req, res) => {
    try {
        const userId = req.userId
        const avatarId = req.body.avatarId;
        const result = await avatarModel.setAvatar(avatarId[0].ID_Avatar, userId);

        console.log('avatar criado no banco de dados');
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Deu ruim'})
    }
    };

const fetchAvatar = async (req, res) => {
    try {
        const userId = req.userId;

        // Primeiro, busque o ID_Avatar na tabela AVATAR_do_COLABORADOR
        const avatarData = await avatarModel.getAvatar(userId);
        
        if (avatarData && avatarData.length > 0) {
            const avatarId = avatarData[0].ID_Avatar;

            // Agora busque o caminho da imagem usando o avatarId
            const avatarDetails = await avatarModel.getAvatarDetails(avatarId);
            if (avatarDetails && avatarDetails.length > 0) {
                res.status(200).json({ avatarPath: avatarDetails[0].avatarPath });
            } else {
                res.status(404).json({ message: 'Detalhes do avatar não encontrados' });
            }
        } else {
            res.status(404).json({ message: 'Avatar não encontrado' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao buscar avatar' });
    }
};

const saveAvatar = async (req, res) => {
    try {
        const userId = req.userId;
        let avatarPath = req.body.avatarId; //pega o ID do avatar do corpo da requisição

        avatarPath = avatarPath.replace(/\//g, '\\')
        //console.log('avatarPath:', avatarPath)
        const avatarId = await avatarModel.findIdAvatarbyPath(avatarPath)
        const result = await avatarModel.setAvatar(avatarId[0].ID_Avatar, userId);

        //console.log('avatar atualizado no banco de dados');
        res.status(200).json(avatarId)
        } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Deu ruim'})
        }
    };
   

module.exports = { createAvatar, saveAvatar, fetchAvatar };

