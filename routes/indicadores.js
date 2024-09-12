// routes/apiRoutes.js
const express = require('express');
const app = express.Router();
const apiController = require('../controller/indicadoresController');
const authenticateToken = require('../middleware/authMiddleware')


// Rota para exibir "Olá, mundo!"
app.get('/indicadores', authenticateToken , apiController.getUserindicadores);


module.exports = app;
