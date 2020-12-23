const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
const StatusCtrl = require('../controllers/status-ctrl')

const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

//Names
protectedRouter.post('/Status', StatusCtrl.postStatuses)//not useable
protectedRouter.get('/Statuses', StatusCtrl.getStatuses)
protectedRouter.post('/StatusByName', StatusCtrl.getStatusByName)


module.exports = router