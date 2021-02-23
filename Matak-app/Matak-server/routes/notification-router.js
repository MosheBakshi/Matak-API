const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");

const NotificationCtrl = require('../controllers/notification-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

/* CRUD */
router.post('/notification', NotificationCtrl.createNotification)
router.post('/notification/get', NotificationCtrl.getNotificationBy)
router.put('/notification', NotificationCtrl.updateNotification)
router.delete('/notification', NotificationCtrl.deleteNotification)


/* others */
router.post('/inbox',NotificationCtrl.getNotificationBySenderName)
router.post('/outbox',NotificationCtrl.getNotificationByRecieverName)

module.exports = router