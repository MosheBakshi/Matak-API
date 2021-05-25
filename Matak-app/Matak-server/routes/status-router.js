const express = require('express')
const router = express.Router()
const StatusCtrl = require('../controllers/status-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

router.post('/status/get',Validations.verifyUser, Permissions.isAdmin, StatusCtrl.getStatuses)


module.exports = router