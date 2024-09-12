// routes/apiRoutes.js
const express = require('express');
const app = express.Router();
const apiPlanilhaAvaliacao = require('../controller/PlanilhaAvaliacao');
const apiPlanilhaCadastro = require('../controller/PlanilhaTecnicos');

// Rotas para inserir dados das planilhas no BD
app.get('/planilhasAvaliacao', apiPlanilhaAvaliacao. createPlanilha);

app.get('/planilhasCadastro', apiPlanilhaCadastro. createPlanilha);


module.exports = app;
