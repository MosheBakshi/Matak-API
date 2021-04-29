const express = require('express')
const router = express.Router();
const NotificationCtrl = require('../controllers/notification-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

/* CRUD */
<<<<<<< HEAD
router.get('/notification',Validations.verifyUser, Permissions.GetNotificationPermission, NotificationCtrl.getNotificationBy)
=======
router.put('/notification/read',Validations.verifyUser, NotificationCtrl.updateRead)
router.get('/notification/get/len',Validations.verifyUser, Permissions.GetUnreadLen, NotificationCtrl.getNotificationLen)
router.get('/notification/get',Validations.verifyUser, Permissions.GetNotificationPermission, NotificationCtrl.getNotificationBy)
>>>>>>> 265fee861c395fba013808b042f5465771c39388
router.post('/notification',Validations.verifyUser, NotificationCtrl.createNotification)
router.post('/notification/get',Validations.verifyUser, NotificationCtrl.getNotificationBy)
router.put('/notification',Validations.verifyUser, NotificationCtrl.updateNotification)
router.delete('/notification',Validations.verifyUser, NotificationCtrl.deleteNotification)


/* others */
router.post('/inbox',Validations.verifyUser,NotificationCtrl.getNotificationBySenderName)
router.post('/outbox',Validations.verifyUser,NotificationCtrl.getNotificationByRecieverName)

module.exports = router