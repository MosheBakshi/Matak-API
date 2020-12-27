const Path = require('../models/path-model')
const Status = require('../models/status-model')
const StatusCtrl = require('../controllers/status-ctrl')
const bcrypt = require("bcrypt")
const db = require('../db')

createPath = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a path',
        })
    }

    const path = new Path(body)

    if (!path) {
        return res.status(400).json({ success: false, error: err })
    }
    path.Path_From = path.Array_Of_Points[0]
    path.Path_To = path.Array_Of_Points[path.Array_Of_Points.length-1]
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
            error: 'You must provide a body to update',
        })
    }

    Path.findOne({ _id: req.params.id }, (err, path) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Path not found!',
            })
        }
        path.name = body.name
        path.time = body.time
        path.rating = body.rating
        path
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: path._id,
                    message: 'Path updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Path not updated!',
                })
            })
    })
}

deletePath = async (req, res, next) => {
    await Path.findOneAndDelete({ _id: req.params.id }, (err, path) => {
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

//check path by id

// getPathById = async (req, res, next) => {
//     try
//     {
//         const body = req.body
//         const paths = await Path.find({ _id: body._id })
//         if (!paths.length) {
//             const error = new Error('Path not found')
//             error.status = 404
//             throw error
//         }
//         return res.status(200).json({ success: true, data: paths })
//     }
//     catch(e){
//         console.log(e)
//         return res.status(e.status).json({ success: false, error: e.message })
//     }
// }
getPathById = async (req, res, next) => {
    try
    {
        const body = req.body
        const paths = await Path.find(body)
        if (!paths.length) {
            const error = new Error('Path not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true,length: paths.length, data: paths })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getPaths = async (req, res, next) => {
    try
    {
        const body = req.body
        const paths = await Path.find({})
        if (!paths.length) {
            const error = new Error('Paths not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: paths })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getPathByStatus = async (req, res, next) => { 
    try
    {
        const body = req.body
        const paths = await Path.find({ Status_Name: body.Status_Name })
        if (!paths.length) {
            const error = new Error('Path not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: paths })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}


module.exports = {
    createPath,
    updatePath,
    deletePath,
    getPaths,
    getPathById,
    getPathByStatus,
}