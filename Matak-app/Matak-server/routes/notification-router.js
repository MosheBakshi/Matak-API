const express = require('express')
const router = express.Router();
const NotificationCtrl = require('../controllers/notification-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

/* CRUD */
router.delete('/notification',Validations.verifyUser, NotificationCtrl.deleteNotification)

router.get('/notification',Validations.verifyUser, Permissions.GetNotificationPermission, NotificationCtrl.getNotificationBy)
router.put('/notification',Validations.verifyUser, NotificationCtrl.updateRead)
router.get('/notification/read',Validations.verifyUser, Permissions.GetUnreadLen, NotificationCtrl.getNotificationBy)
router.put('/notification/unread',Validations.verifyUser, NotificationCtrl.updateUnRead)

module.exports = router