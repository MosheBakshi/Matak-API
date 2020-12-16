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

updatePath = async (req, res) => {
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

deletePath = async (req, res) => {
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

getPathById = async (req, res) => {
    await Path.findOne({ _id: req.params.id }, (err, path) => {
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

getPaths = async (req, res) => {
    await Path.find({}, (err, paths) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!paths.length) {
            return res
                .status(404)
                .json({ success: false, error: `Path not found` })
        }
        return res.status(200).json({ success: true, data: paths })
    }).catch(err => console.log(err))
}

getPathByStatus = async (req, res) => {
    const query = { Status_Name: req.params.Status_Name }
    const options = {
        // sort matched documents in descending order by rating
        // sort: { rating: -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { },
      };
    await Path.find(query, options, (err, paths) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!paths.length) {
            return res
                .status(404)
                .json({ success: false, error: `Paths not found` })
        }
        return res.status(200).json({ success: true, data: paths })
    }).catch(err => console.log(err))
}


module.exports = {
    createPath,
    updatePath,
    deletePath,
    getPaths,
    getPathById,
    getPathByStatus,
}