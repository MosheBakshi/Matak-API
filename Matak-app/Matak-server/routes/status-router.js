const express = require('express')

const StatusCtrl = require('../controllers/status-ctrl')

const router = express.Router()


// router.get('/path/:Name', StatusCtrl.getStatusByName)
router.get('/Statuses', StatusCtrl.getStatuses)

module.exports = router