const express = require('express')

const StatusCtrl = require('../controllers/status-ctrl')

const router = express.Router()

router.post('/Status', StatusCtrl.postStatuses)
// router.get('/path/:Name', StatusCtrl.getStatusByName)
router.get('/Statuses', StatusCtrl.getStatuses)
router.post('/StatusByName', StatusCtrl.getStatusByName)


module.exports = router