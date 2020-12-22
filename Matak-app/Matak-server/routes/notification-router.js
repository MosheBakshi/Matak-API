const express = require('express')

const NotificationCtrl = require('../controllers/notification-ctrl')

const router = express.Router()

router.post('/notification', NotificationCtrl.createNotification)
router.get('/notification/:id', NotificationCtrl.getNotificationById)
router.get('/notifications', NotificationCtrl.getNotification)

module.exports = router