const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun");
// /* for permission - TO DO */
// const permissions = require('../middleware/permission');

// /* Controller methods */
// const authorization = require('../middleware/authorization');
// const validation = require('../middleware/validation');

const PathCtrl = require('../controllers/path-ctrl')

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1");

protectedRouter.post('/path', PathCtrl.createPath)
protectedRouter.put('/path/:id', PathCtrl.updatePath)
protectedRouter.delete('/path/:id', PathCtrl.deletePath)
protectedRouter.get('/path/:id', PathCtrl.getPathById)
protectedRouter.post('/paths', PathCtrl.getPaths)
protectedRouter.get('/pathsbystatus/:status', PathCtrl.getPathByStatus)

module.exports = router