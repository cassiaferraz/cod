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
        let avatarId = req.body.avatarId; //pega o ID do avatar do corpo da requisição

        //const avatar = await avatarModel.getAvatar(avatarId)
        const avatar = await avatarModel.getAvatar(avatarId, userId);
        console.log(avatarId)

        res.status(200).json(avatar)
        } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Deu ruim'})
        }
    };
   

    const fetchAvatar = async (req, res) => {
        try {
            const userId = req.userId;
            let avatarId = req.body.avatarId; //pega o ID do avatar do corpo da requisição
    
            //const avatar = await avatarModel.getAvatar(avatarId)
            const avatar = await avatarModel.getAvatar(avatarId, userId);
    
            res.status(200).json(avatar)
            } catch (err) {
            console.log(err)
            res.status(404).json({message: 'Deu ruim'})
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

