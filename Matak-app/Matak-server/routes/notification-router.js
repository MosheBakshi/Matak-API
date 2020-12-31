const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const NotificationCtrl = require('../controllers/notification-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");
router.post('/notification', NotificationCtrl.createNotification)
router.post('/getnoteby', NotificationCtrl.getNotificationById)
router.post('/notifications', NotificationCtrl.getNotification)
router.put('/notification', NotificationCtrl.updateNotification)
router.delete('/notification', NotificationCtrl.deleteNotification)
module.exports = router