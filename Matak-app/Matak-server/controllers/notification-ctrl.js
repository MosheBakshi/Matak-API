const Notification = require('../models/notification-model')

/* just skeleton */

// create
createNotification = (req, res, next) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a notification',
        })
    }

    const notification = new Notification(body)

    if (!notification) {
        return res.status(400).json({ success: false, error: err })
    }

    notification
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: notification._id,
                text: notification.notification_text,
                receiver_id: notification.receiver_id,
                sender_id: notification.sender_id,
                date: notification.date,
                message: 'Notification created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Notification not created!',
            })
        })
}

//Delete
deleteNotification = async (req, res, next) => {
    try{
        const body = req.body
        const notification = await Notification.findOneAndDelete({ _id: body._id })
            if (!notification) {
                const error = new Error('Notification not found')
                error.status = 404
                throw error
            }
            return res.status(200).json({ success: true, data: notification })
        }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}

// update 
updateNotification = async (req, res, next) => {
    try{
    const body = req.body
    if (!body) {
        const error = new Error('You must provide a body to update')
        error.status = 400
        throw error
    }

        const notification = await Notification.findOneAndUpdate({_id: body._id},{$set:req.body})
        if (!notification) {
            const error = new Error('Notification not found!')
            error.status = 404
            throw error
        }
        notification.$set(req.body)
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Notification updated!',
                })
            })
            .catch(er => {
                const err = new Error('Notification not updated!')
                err.status = 404
                throw err
            })
        
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({ success: false, error: e.message })
    }
}
 
// fix to post
getNotificationById = async (req, res, next) => {
    await Notification.findOne({ _id: req.params.id }, (err, notification) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, error: `Notification not found` })
        }
        return res.status(200).json({ success: true, data: notification })
    }).catch(err => console.log(err))
}


// body to fix
getNotification = async (req, res, next) => {
    await Notification.find({}, (err, notification) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!notification.length) {
            return res
                .status(404)
                .json({ success: false, error: `Notification not found` })
        }
        return res.status(200).json({ success: true, data: notification })
    }).catch(err => console.log(err))
}

module.exports = {
    createNotification,
    getNotification,
    getNotificationById,
    updateNotification,
    deleteNotification

}