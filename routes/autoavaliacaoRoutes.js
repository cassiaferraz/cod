const express = require('express');
const router = express.Router();
const apiController = require('../controller/autoAvaliacaoController');
const verification = require('../controller/autoAvaliacaoController');
const authenticateToken = require('../middleware/authMiddleware'); 



 
router.post('/Auto', authenticateToken, apiController.create);

router.get('/Auto/Verificar', authenticateToken, verification.verificationAvaliation);



module.exports = router;
 