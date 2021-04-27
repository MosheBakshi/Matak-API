const fs = require('fs');
const { promisify } = require('util')
const Path = require('../models/path-model')
const unlinkAsync = promisify(fs.unlink)
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
    if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/heic' 
    || file.mimetype === 'application/pdf'
    || file.mimetype === 'image/png')
    {
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
    //console.log(req.files)
    next()
     })
   }

checkNumberOfFiles = (req, res, next) => {
    return res.status(200).json({
        success: true
    })
}

deletFiles = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }
    if (!body._id){
        return res.status(400).json({ success: false, error: `Path not found` })
    }
    if (!body.fileToDelete) {
        return next()
    }
    await Path.findById(body._id, (err, paths) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!paths){
            return res.status(400).json({ success: false, error: `Path not found` })
        }
        body.Files_Path_Array = paths.Files_Path_Array
    })
    .catch(e =>{
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })})
    body.fileToDelete.forEach(async function (item, index) {
        index1 = body.Files_Path_Array.indexOf(item)
        body.Files_Path_Array.splice(index1, 1)
        await unlinkAsync(process.cwd() + "\\"+ item)
        });
    next()
}
module.exports = {
    uploadFile,
    checkNumberOfFiles,
    deletFiles,
}