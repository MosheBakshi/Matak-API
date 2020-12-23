const Status = require('../models/status-model')


checkStatusByName = async (req, res, next) => {
    try
    {
        const body = req.body
        const status = await Status.findOne({ Status_Name: body.Status_Name })
        if (!status) {
            const error = new Error('status Not FOUND')
            error.status = 404
            throw error 
        }
        next()
    }
    catch (e){
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

getStatusByName = async (req, res, next) => {
    try
    {
        const body = req.body
        const status = await Status.findOne({ Status_Name: body.Status_Name })
        if (!status) {
            return res.status(404).json({ success: false, error: `Status not valid` })
        }
        next(res.status(200).json({ success: true, data: status }))
    }
    catch (error){
        console.log(error)
    }
}

getStatuses = async (req, res) => {
    await Status.find({}, (err, status) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!status.length) {
            return res
                .status(404)
                .json({ success: false, error: `Status not found` })
        }
        return res.status(200).json({ success: true, data: status })
    }).catch(err => console.log(err))
}



postStatuses= (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a path',
        })
    }

    const status1 = new Status(body)

    if (!status1) {
        return res.status(400).json({ success: false, error: err })
    }
    status1
        .save()
        .then(() => {

            return res.status(201).json({
                success: true,
                id: status1._id,
                status: status1,
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
module.exports = {
    getStatuses,
    postStatuses,
    getStatusByName,
    checkStatusByName,
}