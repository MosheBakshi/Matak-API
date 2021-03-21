const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun")
const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1")
const PathCtrl = require('../controllers/path-ctrl')
const FileCtrl = require('../controllers/file-ctrl')

router.post('/path', FileCtrl.uploadFile, PathCtrl.createPath)
//router.post('/path/addfiles', FileCtrl.checkNumberOfFiles, FileCtrl.uploadFile)
// /* for permission - TO DO */
// const permissions = require('../middleware/permission');

// /* Controller methods */
// const authorization = require('../middleware/authorization');
// const validation = require('../middleware/validation');




 /* CRUD */
router.post('/path/get', PathCtrl.getPathBy)
router.put('/path', PathCtrl.updatePath)
router.delete('/path', PathCtrl.deletePath)


module.exports = router