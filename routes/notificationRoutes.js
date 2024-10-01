const express = require('express');
// const verifyJwt = require('../middlewares/verifyJWT')

const router = express.Router();

const notificationController = require('../controller/notificationController');

router.post('/createNotification', notificationController.createNotification)
// router.get('/getUserNotifications', verifyJwt, notificationController.getNotificationsByReceiverId)
// router.put('/readNotification/:id', verifyJwt, notificationController.changeNotificationToReaded)
// router.delete('/deleteNotification/:id', verifyJwt, notificationController.deleteNotification)

module.exports = router;