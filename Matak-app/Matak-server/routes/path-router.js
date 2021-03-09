const express = require('express')
const { withJWTAuthMiddleware } = require("express-kun")
const router = express.Router()
const protectedRouter = withJWTAuthMiddleware(router, "Cvbs!#56drsg575jrfsd@23456ewdg1")
const PathCtrl = require('../controllers/path-ctrl')

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
    if (file.mimetype === 'image/jpeg'){ // doc,pdf,etc
        cb(null, true)
    }
    else{
        cb(new Error('Bad format'))
    }
}

const upload = multer({  //define upload types
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB each file alone
        files: 5 // 5 files max
    },
    fileFilter: fileFilter 
 }).array('File')

 router.post('/path', function (req, res, next) {
     upload(req, res, function (err) {
     if (err) {
         return res.status(400).json({
             success: false,
             err,
             message: err.message,
         })
       }
    // console.log(req.files)
    console.log(req.body)
    next()
    // return res.status(201).json({
    //      success: true,
    //      path: req.files,
    //      message: 'File uploaded',
    //  })
     })
   }, PathCtrl.createPath)
///////// End of File uploading ////////////// 

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