const express = require('express')
const getUserController = require('../controller/getUserController')
const getUserAvaliations = require('../controller/Missoes')
const authenticateToken = require('../middleware/authMiddleware')
const router = express.Router();



router.get('/getUserData', authenticateToken, getUserController.getUserData)

router.get('/CriardadosProgression', getUserController.createUserProgressionData)

router.get('/CalculardadosProgression', getUserAvaliations.TotalAvaliations)



module.exports = router;