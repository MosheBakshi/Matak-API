const express = require('express')
const router = express.Router()
const StatusCtrl = require('../controllers/status-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

//router.post('/status', StatusCtrl.postStatuses)//not useable
router.post('/status/get',Validations.verifyUser, StatusCtrl.getStatuses)
// protectedRouter.post('/statusByName', StatusCtrl.getStatusByName)


module.exports = router