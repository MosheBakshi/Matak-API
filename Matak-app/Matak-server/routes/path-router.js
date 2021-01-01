const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun")
// /* for permission - TO DO */
// const permissions = require('../middleware/permission');

// /* Controller methods */
// const authorization = require('../middleware/authorization');
// const validation = require('../middleware/validation');

const router = express.Router()
const PathCtrl = require('../controllers/path-ctrl')

const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1")
/* CRUD */
router.post('/path', PathCtrl.createPath)
router.get('/path', PathCtrl.getPathBy)
router.put('/path', PathCtrl.updatePath)
router.delete('/path', PathCtrl.deletePath)


module.exports = router