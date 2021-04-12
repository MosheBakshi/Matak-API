const express = require('express')
const router = express.Router()
const PathCtrl = require('../controllers/path-ctrl')
const FileCtrl = require('../controllers/file-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

router.post('/path', Validations.verifyUser,FileCtrl.uploadFile, PathCtrl.createPath)
//router.post('/path/addfiles', FileCtrl.checkNumberOfFiles, FileCtrl.uploadFile)

 /* CRUD */
router.post('/path/get',Validations.verifyUser, PathCtrl.getPathBy)
router.post('/path/getper',Validations.verifyUser,Permissions.GetPathPermission, PathCtrl.getPathBy)
router.put('/path',Validations.verifyUser, FileCtrl.deletFiles, PathCtrl.updatePath)
router.delete('/path',Validations.verifyUser, PathCtrl.deletePath)


module.exports = router