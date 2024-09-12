const buscaravaliacao = require ('../models/buscarautoavaliacaoModel')
const buscaravaliacaosugerida = require ('../models/buscarautoavaliacaoModel')
 

//AUTO AVALIACAO
const getAutoAvaliacao = async(req, res) => {
    try{
        const userId = req.userId
        const autoavaliacao = await buscaravaliacao.getUser(userId)
        res.status(200).json(autoavaliacao)
    } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Deu ruim'})
    }
};

// AVALIACAO SUGERIDA
const getAvaliationSugerida = async(req, res) => {
    try{
        const userId = req.userId
        const autoavaliacaosugerida = await buscaravaliacaosugerida.getUserSugerida(userId)
        res.status(200).json(autoavaliacaosugerida)
    } catch (err) {
        console.log(err)
        res.status(404).json({message: 'Deu ruim'})
    }
};
 
module.exports = {
    getAutoAvaliacao,
    getAvaliationSugerida
}