const express = require('express')

const PathInfoCtrl = require('../controllers/Paths-Additional-Info-ctrl')

const router = express.Router()

router.post('/pathInfo', PathInfoCtrl.createPathInfo)
// router.put('/pathInfo/:id', PathInfoCtrl.updatePathInfo)
// router.delete('/pathInfo/:id', PathInfoCtrl.deletePathInfo)
// router.get('/pathInfo/:id', PathInfoCtrl.getPathByIdInfo)
// router.get('/pathsInfo', PathInfoCtrl.getPathsInfo)

module.exports = router