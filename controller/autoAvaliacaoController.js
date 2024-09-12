const {createHabilidade} = require('../models/autoAvaliacaoModel');
const {countAvaliacoesMesAtual} = require('../models/autoAvaliacaoModel')

 
const verificationAvaliation = async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        console.log(req.body);

        const id = req.userId;
        const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD

        // Verificar se o usuário já fez 3 avaliações no dia atual
        const result = await countAvaliacoesMesAtual(id, today);
        const totalAvaliacoes = result.recordset ? result.recordset[0].TOTAL : result[0].TOTAL;
        console.log(today)
        console.log('TotalAvaliações:', totalAvaliacoes)

        if (totalAvaliacoes < 1) {
            return res.status(200).json({ disponivel: true });
        } else {
            return res.status(200).json({ disponivel: false });
        }
    } catch (error) {
        console.error('Erro ao verificar avaliações:', error)
        res.status(400).json({ error: error.message });
    }
};



const create = async (req, res) => {
 
            try {
         
        const userId = req.userId;
        //Cria a avaliação, se permitido
        const conectividade = req.body.CONECTIVIDADE;
        const casainteligente = req.body.CASA_INTELIGENTE;
        const Eletrica = req.body.ELETRICA;
        const AudioVideo = req.body.AUDIO_VIDEO;
        const Pabx = req.body.PABX_VOIP;
        const Metalico = req.body.METALICO;
        const dataAvaliacao = req.body.DATA_HORA;
 
        // Verificação básica para valores undefined
 
        if (
 
            userId === undefined ||
            conectividade === undefined ||
            casainteligente === undefined ||
            Eletrica === undefined ||
            AudioVideo === undefined ||
            Pabx === undefined ||
            Metalico === undefined
           
 
        ) {
 
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
 
           
 
        }
 
        const newHabilidade = {
 
            ID_COLABORADOR: userId,
            CONECTIVIDADE: conectividade,
            CASA_INTELIGENTE: casainteligente,
            ELETRICA: Eletrica,
            AUDIO_VIDEO: AudioVideo,
            PABX_VOIP: Pabx,
            METALICO: Metalico,
            DATA: dataAvaliacao
 
        };
 
         await createHabilidade(newHabilidade);
 
        res.status(201).json({ message: 'Habilidades registradas com sucesso' });
    
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    
 
    }
   
 
 
};
 
module.exports = {
 
    create,
    verificationAvaliation
 
};