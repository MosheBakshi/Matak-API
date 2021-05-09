const Notification = require('../models/notification-model')

/* Latest eyal's work */

// create
createNotification = (req, res, next) => {
    const body = req.body

    if (!body) {
        //throw Error('You must provide a notification')
        console.log('You must provide a notification')
        }

    const notification = new Notification(body)
    if (!notification) {
        //throw Error('Notification Creation Failed')
        console.log('Notification Creation Failed')
    }

    notification
        .save()
        .then(() => {
            return
        })
        .catch(error => {
            //throw Error('Notification Creation Failed')
            console.log('Notification Creation Failed')
        })
}
//shablona
updateNotification = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }
        await Notification.findOneAndUpdate({_id: body._id},{$set:body}, (err, notification) =>{
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if (!notification) {
            return res.status(404).json({
                success: false, 
                error: `Notification not found` })
        }
        notification.$set(body)
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    notification : notification,
                    message: 'Notification updated!',
                })
            })
            .catch(er => {
                return res.status(404).json({
                    success: false, error: `Notification not updated` })
            })
        })
}
//shablona
deleteNotification = async (req, res, next) => {
    const body = req.body
    const notification = await Notification.find({ _id:{$in: body._id} }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    }).catch(err => console.log(err))
    if (!notification) {
        return res
            .status(404)
            .json({ success: false, error: `Notification not found` })
    }
    await Notification.deleteMany({ _id:{$in: body._id} }, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: notification })
    }).catch(err => console.log(err))
}


//return in reverse
getNotificationBy = async (req, res, next) => {
    const body = req.body
    await Notification.find(body, (err, notification) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({success :true , length: notification.length, data : notification.reverse()})
    })
    .catch(e => {
        console.log(e)
        return res.status(e.status).json({success : false , error : e.message})})
}

// updateRead = async (req, res, next) => {
//     const body = req.body
//     if (!body) {
//         return res.status(400).json({
//             success: false, 
//             error: `Body not found` })
//     }
//         await Notification.findOneAndUpdate({_id: body._id},{$set: {"Read":true}}, (err, notification) =>{

//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
        
//         if (!notification) {
//             return res.status(404).json({
//                 success: false, 
//                 error: `notification not found` })
//         }
//         notification.$set( {"Read":true})
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     data: notification,
//                     message: 'notification updated!'
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     success: false, error: `notification not updated` })
//             })
//         })
// }

updateRead = async (req, res, next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false, 
            error: `Body not found` })
    }
        await Notification.updateMany({_id: {$in: body._id}},{$set: {"Read":true}}, (err, notification) =>{

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        
        if (!notification) {
            return res.status(404).json({
                success: false, 
                error: `notification not found` })
        }
        return res.status(200).json({
            success: true,
            data: notification,
            message: 'notification updated!'
        })
        })
}

module.exports = {
    createNotification,
    getNotificationBy,
    updateNotification,
    deleteNotification,
    updateRead

}

