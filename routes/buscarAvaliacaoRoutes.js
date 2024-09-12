// routes/apiRoutes.js
const express = require('express');
const app = express.Router();
const apiController = require('../controller/buscarAutoAvaliacaoController.js');
const apiControllerSug = require('../controller/buscarAutoAvaliacaoController.js');
const authenticateToken = require('../middleware/authMiddleware');
 
 

app.get('/Auto', authenticateToken, apiController.getAutoAvaliacao);

app.get('/Sugerida', authenticateToken, apiControllerSug.getAvaliationSugerida);
 
 
module.exports = app;