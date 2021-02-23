const Status = require('../models/status-model')

// checkStatusByName = async (req, res, next) => {
//     try
//     {
//         const body = req.body
//         const status = await Status.findOne({ Status_Name: body.Status_Name })
//         if (!status) {
//             const error = new Error('Status name not valid')
//             error.status = 404
//             throw error
//         }
//         next()
//     }
//     catch (e){
//         console.log(e)
//         return res.status(e.status).json({ success: false, error: e.message })
//     }
// }

// getStatusByName = async (req, res, next) => {
//     try
//     {
//         const body = req.body
//         const status = await Status.findOne({ Status_Name: body.Status_Name })
//         if (!status) {
//             const error = new Error('Status name not valid')
//             error.status = 404
//             throw error
//         }
//         return res.status(200).json({ success: true, data: status })
//     }
//     catch (e){
//         console.log(e)
//         return res.status(e.status).json({ success: false, error: e.message })
//     }
// }

getStatuses = async (req, res, next) => {
    try
    {
        const body = req.body
        const status = await Status.find({})
        if (!paths.length) {
            const error = new Error('Statuses not found')
            error.status = 404
            throw error
        }
        return res.status(200).json({ success: true, data: status })
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}


//no needed
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
    //getStatusByName,
    //checkStatusByName,
}