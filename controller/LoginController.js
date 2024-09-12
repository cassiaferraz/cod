const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
 
async function login(req, res) {
    const { userEmail, userPassword } = req.body;
    try {
        const user = await User.authenticateUser(userEmail, userPassword);
        if (!user) {
            return res.status(401).json({ auth: false, message: 'Credenciais inválidas' });
        }
        const token = jwt.sign({ userId: user.ID_COLABORADOR }, 'secreto', { expiresIn: '1h' });

        let isFirstAccess = false;
        if (userPassword == user.ID_COLABORADOR) {
            isFirstAccess = true;
        } else {
            console.log('Login efetuado');
        }

        // Inclua o userId na resposta JSON
        res.status(200).json({ auth: true, isFirstAccess, token: token, userId: user.ID_COLABORADOR, message: 'Login bem-sucedido' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ auth: false, message: 'Erro interno do servidor' });
    }
}
 
module.exports = {
    login
};

