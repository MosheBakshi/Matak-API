const express = require('express')

const PathCtrl = require('../controllers/path-ctrl')

const router = express.Router()

router.post('/path', PathCtrl.createPath)
router.put('/path/:id', PathCtrl.updatePath)
router.delete('/path/:id', PathCtrl.deletePath)
router.get('/path/:id', PathCtrl.getPathById)
router.get('/paths', PathCtrl.getPaths)
router.get('/pathsbystatus/:status', PathCtrl.getPathByStatus)

module.exports = router