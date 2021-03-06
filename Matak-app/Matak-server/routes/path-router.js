const express = require('express')
const router = express.Router()
const PathCtrl = require('../controllers/path-ctrl')
const FileCtrl = require('../controllers/file-ctrl')

const Permissions = require('../middleware/permissions')
const Validations = require('../middleware/validation')

router.post('/path', Validations.verifyUser,FileCtrl.uploadFile, PathCtrl.createPath)
router.post('/path/byid', Validations.verifyUser,Permissions.GetPathByIdPermission, PathCtrl.getPathBy)
router.post('/path/download',Validations.verifyUser,  FileCtrl.downloadFiles)//download

 /* CRUD */
// router.post('/path/get',Validations.verifyUser, PathCtrl.getPathBy) // DO NOT DELETE
router.get('/path',Validations.verifyUser,Permissions.GetPathPermission, PathCtrl.getPathBy)
router.put('/path',Validations.verifyUser,  PathCtrl.updatePath)
router.delete('/path',Validations.verifyUser,Permissions.isMatakOrAdmin, PathCtrl.deletePath)



module.exports = router