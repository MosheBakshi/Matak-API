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

 uploadFile =  (req, res, next) => {
     upload(req, res, function (err) {
     if (err) {
         return res.status(400).json({
             success: false,
             err,
             message: err.message,
         })
       }
    next()
     })
   }

checkNumberOfFiles = (req, res, next) => {
    console.log(req.body)
    return res.status(200).json({
        success: true
    })
}

module.exports = {
    uploadFile,
    checkNumberOfFiles,
}