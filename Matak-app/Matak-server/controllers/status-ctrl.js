const Status = require('../models/status-model')

// getStatusByName = async (req, res) => {
//     await Path.findOne({ _id: req.params }, (err, path) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!path) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Status not found` })
//         }
//         return res.status(200).json({ success: true, data: path })
//     }).catch(err => console.log(err))
// }

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

module.exports = {
    getStatuses,
    // getStatusByName,
}