const PathInfo = require('../models/Paths-Additional-Info-model')
const Path = require('../models/path-model')

createPathInfo = (req, res) => {
    const body = req.body
    const path = Path.findOne({ _id: body.idDB}, (err, path) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Path id not match!',
            })
        }
    })
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a path info',
        })
    }

    const pathInfo = new PathInfo(body)

    if (!pathInfo) {
        return res.status(400).json({ success: false, error: err })
    }
    
    pathInfo
        .save()
        .then(() => {
            return res.status(201).json({ // to edit
                success: true,
                PathInfo: pathInfo,
                // id: pathInfo._id,
                // Path_Name: pathInfo.Path_Name,
                // Applicant_user_id: pathInfo.Applicant_user_id,
                // Start_Date: pathInfo.Start_Date,
                // End_Date: pathInfo.End_Date,
                // Reason_Text: pathInfo.Reason_Text,
                // Involved_Organ_Array: pathInfo.Involved_Organ_Array,
                // Escort_Organ_Array: pathInfo.Escort_Organ_Array,
                // Vehicles_Id_Involved_Array: pathInfo.Vehicles_Id_Involved_Array,
                // Route_Type: pathInfo.Route_Type,
                // Remarks: pathInfo.Remarks,
                message: 'PathInfo created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'PathInfo not created!',
            })
        })
}



module.exports = {
    createPathInfo,
    // updatePathInfo,
    // deletePathInfo,
    // getPathsInfo,
    // getPathByIdInfo,
}