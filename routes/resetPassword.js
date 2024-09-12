const express = require('express');
const router = express.Router();
const  updateUser  = require('../controller/UpdateController'); // Importe o controlador adequado
const authenticateToken = require('../middleware/authMiddleware');



// Rota para redefinir a senha
router.post('/reset-password',  authenticateToken,updateUser.updateUserPassword);

module.exports = router;
