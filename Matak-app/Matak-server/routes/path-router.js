const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun")
// /* for permission - TO DO */
// const permissions = require('../middleware/permission');

// /* Controller methods */
// const authorization = require('../middleware/authorization');
// const validation = require('../middleware/validation');

const router = express.Router()
const PathCtrl = require('../controllers/path-ctrl')
const StatusCtrl = require('../controllers/status-ctrl')

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1")

protectedRouter.post('/path', PathCtrl.createPath)
protectedRouter.put('/path/:id', PathCtrl.updatePath)//need to be fixed
protectedRouter.delete('/path/:id', PathCtrl.deletePath)//need to be fixed
protectedRouter.post('/getpath', PathCtrl.getPathBy)//post

module.exports = router