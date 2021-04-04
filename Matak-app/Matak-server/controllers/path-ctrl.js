const Path = require('../models/path-model')
const jwt = require("jsonwebtoken")
const secrets = require('../middleware/config');

createPath = (req, res) => {
    const token = req.cookies.token || '';
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a path',
        })
    }
    var path = JSON.parse(body.data)

    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            path.Applicant_User_Id = decodedToken.user._id
            path.Organization_Name = decodedToken.user.Organization_Name
        }
    })
    path.Status_Name = "Submitted"
    path = new Path(path)

    //console.log(req.files)
    
    if (!path) {
        return res.status(400).json({ success: false, error: err })
    }

    for (x in req.files) {
        path.Files_Path_Array.push(req.files[x].path)
    }

    path
        .save()
        .then(() => {

            return res.status(201).json({
                success: true,
                id: path._id,
                path: path,
                message: 'Path created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Path not created!',
            })
        })
}

updatePath = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }

        await Path.findOneAndUpdate({_id: body._id},{$set: body}, (err, path) =>{
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if (!path) {
            return res.status(404).json({
                success: false, 
                error: `Path not found` })
        }
        path.$set( body)
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    organ: path,
                    message: 'Path updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success: false, error: `Path not updated` })
            })
        })
}

deletePath = async (req, res, next) => {
    const body = req.body
    await Path.findOneAndRemove({ _id: body._id }, (err, path) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!path) {
            return res
                .status(404)
                .json({ success: false, error: `Path not found` })
        }

        return res.status(200).json({ success: true, data: path })
    }).catch(err => console.log(err))
}


getPathBy = async (req, res, next) => {
    const body = req.body
    await Path.find(body, (err, paths) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true,length: paths.length, data: paths })
    })
    .catch(e =>{
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })})
}

// addFile = async (req, res, next) => {
//     const body = new Path(JSON.parse(body.data))
//     if (!body) {
//         return res.status(400).json({
//             success: false, 
//             error: `Body not found` })
//     }

//         await Path.findOneAndUpdate({_id: body._id},{$set: body}, (err, path) =>{
        
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
        
//         if (!path) {
//             return res.status(404).json({
//                 success: false, 
//                 error: `Path not found` })
//         }
//         path.$set( body)
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     organ: path,
//                     message: 'Path updated!',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     success: false, error: `Path not updated` })
//             })
//         })
// }

module.exports = {
    createPath,
    updatePath,
    deletePath,
    getPathBy,
}