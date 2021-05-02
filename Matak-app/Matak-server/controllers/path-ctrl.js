const Path = require('../models/path-model')
const jwt = require("jsonwebtoken")
const secrets = require('../middleware/config');
const NotificationCtrl = require('../controllers/notification-ctrl')

createPath =  (req, res, next) => {
    const token = req.cookies.token || '';
    const body = req.body
    var senderName
    var senderEmail
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a path',
        })
    }
    var path = JSON.parse(body.data)
    if (!path.hasOwnProperty("Start_Point"))
        return res.status(400).json({
            success: false,
            error: 'You must provide a Start_Point',
        })
    if (!path.hasOwnProperty("End_Point"))
    return res.status(400).json({
        success: false,
        error: 'You must provide a End_Point',
    })
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            path.Applicant_User_Id = decodedToken.user._id
            path.Organization_Name = decodedToken.user.Organization_Name
            senderName = decodedToken.user.First_Name + ' ' + decodedToken.user.Last_Name
            senderEmail = decodedToken.user.Email
        }
    })
    path.Status_Name = "Submitted"
    path.Approval_User_Id = ""
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
            req.body = {
                Notification_Text: "New Path",
                Path_Id : path._id,
                Sender_Id: path.Applicant_User_Id,
                Sender_Organization: path.Organization_Name,
                Receiver_Organization: "Matak",
                Sender_Name : senderName,
                Sender_Email: senderEmail,
                Path_Name: path.Path_Name,
            }
            NotificationCtrl.createNotification(req,res,next)
            return res.status(201).json({
                success: true,
                id: path._id,
                path: path,
                message: 'Path created!',
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({
                error,
                message: 'Path not created!',
            })
        })
}

updatePath = async (req, res, next) => {
    var user
    const token = req.cookies.token || '';
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if(err) {
            return res.status(401).json({ success: false, error: err })
        }
        else {
            user = decodedToken.user
        }
    })
    if (user.User_Type != 'Arbel')
        body.Approval_User_Id = user._id
        
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
            if (user.User_Type == 'Arbel'){
            req.body = {
                Notification_Text: "Update Path",
                Path_Id : path._id,
                Sender_Id: path.Applicant_User_Id,
                Sender_Organization: path.Organization_Name,
                Receiver_Organization: "Matak",
                Sender_Name : user.First_Name + ' ' + user.Last_Name,
                Sender_Email: user.Email,
                Path_Name: path.Path_Name,
                }
            }
            else {
                req.body = {
                    Notification_Text: "Update Path",
                    Path_Id : path._id,
                    Sender_Id: user._id,
                    Sender_Organization: "Matak",
                    Receiver_Organization: path.Organization_Name,
                    Sender_Name : user.First_Name + ' ' + user.Last_Name,
                    Sender_Email: user.Email,
                    Path_Name: path.Path_Name,
                    }
                }
            NotificationCtrl.createNotification(req,res,next)
            return res.status(200).json({
                success: true,
                data: path,
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
    const path = await Path.findOne({ _id: body._id }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    }).catch(err => console.log(err))
    if (!path) {
        return res
            .status(404)
            .json({ success: false, error: `Path not found` })
    }
    await Path.findOneAndDelete({ _id: body._id }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
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
        console.log(paths)
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