const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const StatusCtrl = require('../controllers/status-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

protectedRouter.post('/status', StatusCtrl.postStatuses)//not useable
protectedRouter.get('/status', StatusCtrl.getStatuses)
protectedRouter.post('/statusByName', StatusCtrl.getStatusByName)


module.exports = router