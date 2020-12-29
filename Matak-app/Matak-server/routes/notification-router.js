const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const NotificationCtrl = require('../controllers/notification-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

protectedRouter.post('/notification', NotificationCtrl.createNotification)
protectedRouter.get('/notification/:id', NotificationCtrl.getNotificationById)//need to be fixed
protectedRouter.get('/notifications', NotificationCtrl.getNotification)

module.exports = router