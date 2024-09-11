// routes/apiRoutes.js
const express = require('express');
const app = express.Router();
 
const perfilRoutes = require('./perfil.js') // Importe o arquivo de rotas dos perfis
app.use('/', perfilRoutes) // Use as rotas dos perfis
 
 
const indicadoresRoutes = require('./indicadores.js') // Importe o arquivo de rotas dos indicadores
app.use('/', indicadoresRoutes) // Use as rotas dos indicadores
 
 
const avaliacaoRoutes = require('./avaliacaoMissoes.js') // Importe o arquivo de rotas das avaliações
app.use('/', avaliacaoRoutes) // Use as rotas das avaliações
 
 
 
const habRoutes = require('./habilidadesRoutes.js') //  Importe o arquivo de rotas das Habilidades
app.use('/', habRoutes)  // Use as rotas das Habilidades
 
 
const medalhaRoutes = require('./medalhasRoutes.js') //  Importe o arquivo de rotas das  Medalhas
app.use('/', medalhaRoutes) // Use as rotas das  Medalhas

const desafiosRoutes = require('./desafiosRoutes.js') //  Importe o arquivo de rotas das  Medalhas
app.use('/', desafiosRoutes) // Use as rotas das  Medalhas
 
const autoRoutes = require('./autoavaliacaoRoutes.js') //  rota do insert da auto avaliacao no banco
app.use('/', autoRoutes)
 
const autoavaliacaoRoutes = require('./buscarAvaliacaoRoutes.js') //  Importe o arquivo de rotas das Auto Avaliações
app.use('/', autoavaliacaoRoutes) // Use as rotas das  Auto Avaliações
 
const userGetRoutes = require('./getUserRoutes.js');
app.use('/', userGetRoutes)


const avatarRoutes = require('./avatarRoutes'); 
app.use('/', avatarRoutes);

const ChallengeRoutes = require('./ChallengeRoutes.js');
app.use('/', ChallengeRoutes)

 
const planilhaRoutes = require('./planilhas.js') // Importe o arquivo de rotas das Habilidades e medalhas
app.use('/', planilhaRoutes) // Use as rotas das Habilidades e medalhas
 
 
 
module.exports = app;
