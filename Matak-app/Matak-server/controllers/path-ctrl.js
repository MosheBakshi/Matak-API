const Path = require('../models/path-model')
const GeoJSON = require('geojson')

createPath = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a path',
        })
    }

    var path = new Path(JSON.parse(body.data))
    console.log(req.files)
    
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
    await Path.findOneAndDelete({ _id: body._id }, (err, path) => {
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