// routes/apiRoutes.js
const express = require('express');
const app = express.Router();
const apiController = require('../controller/desafiosController.js');


app.get('/desafios', apiController.getUserDesafios);


module.exports = app;
