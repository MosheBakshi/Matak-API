const Path = require('../models/path-model')


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
            error: `Body not found` })
    }

        await Path.findOneAndUpdate({_id: body._id},{$set:req.body}, (err, path) =>{
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if (!path) {
            return res.status(404).json({
                success: false, 
                error: `Path not found` })
        }
        path.$set(req.body)
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



module.exports = {
    createPath,
    updatePath,
    deletePath,
    getPathBy,
}