const express = require('express')
const router = express.Router();
const NotificationCtrl = require('../controllers/notification-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

/* CRUD */
router.post('/notification',Validations.verifyUser, NotificationCtrl.createNotification)
router.post('/notification/get',Validations.verifyUser, NotificationCtrl.getNotificationBy)
router.put('/notification',Validations.verifyUser, NotificationCtrl.updateNotification)
router.delete('/notification',Validations.verifyUser, NotificationCtrl.deleteNotification)


/* others */
router.post('/inbox',Validations.verifyUser,NotificationCtrl.getNotificationBySenderName)
router.post('/outbox',Validations.verifyUser,NotificationCtrl.getNotificationByRecieverName)

module.exports = router