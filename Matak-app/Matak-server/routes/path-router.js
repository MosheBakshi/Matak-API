const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun")
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1")
///////// Start of File uploading ////////////// 

const multer  = require('multer') // define library
const storage = multer.diskStorage({ // define storage format and destination
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime() + " " + file.originalname)
    }
})
const fileFilter = (req, file, cb) =>{ // define file filtering
    if (file.mimetype === 'image/jpeg'){
        cb(null, true)
    }
    else{
        cb(new Error('Bad format'))
    }
}

const upload = multer({  //define upload types
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter 
 }).array('File', 5)

 router.post('/file', function (req, res) {
 
     upload(req, res, function (err) {
     if (err) {
         return res.status(400).json({
             err,
             message: err.message,
         })
       }
       console.log(req.file)
       console.log(req.body)
       return res.status(201).json({
         success: true,
         message: 'File uploaded',
     })
     })
   })
///////// End of File uploading ////////////// 

// /* for permission - TO DO */
// const permissions = require('../middleware/permission');

// /* Controller methods */
// const authorization = require('../middleware/authorization');
// const validation = require('../middleware/validation');

const router = express.Router()
const PathCtrl = require('../controllers/path-ctrl')


 /* CRUD */
router.post('/path', PathCtrl.createPath)
router.post('/path/get', PathCtrl.getPathBy)
router.put('/path', PathCtrl.updatePath)
router.delete('/path', PathCtrl.deletePath)


module.exports = router