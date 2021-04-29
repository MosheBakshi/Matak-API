const express = require('express')
const router = express.Router();
const NotificationCtrl = require('../controllers/notification-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

/* CRUD */
router.get('/notification/get',Validations.verifyUser, Permissions.GetNotificationPermission, NotificationCtrl.getNotificationBy)
router.post('/notification',Validations.verifyUser, NotificationCtrl.createNotification)
router.post('/notification/get',Validations.verifyUser, NotificationCtrl.getNotificationBy)
router.put('/notification',Validations.verifyUser, NotificationCtrl.updateNotification)
router.delete('/notification',Validations.verifyUser, NotificationCtrl.deleteNotification)


/*count read = false should return Number
admin : all
matak : Reciver Organization = matak
arbel : Reciver Organization = self organ
*/

/*Update Read:
set read to true by notification id*/

/* others */
router.post('/inbox',Validations.verifyUser,NotificationCtrl.getNotificationBySenderName)
router.post('/outbox',Validations.verifyUser,NotificationCtrl.getNotificationByRecieverName)

module.exports = router