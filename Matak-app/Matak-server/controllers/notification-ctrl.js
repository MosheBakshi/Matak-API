const Notification = require('../models/notification-model')

/* Latest eyal's work */

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

//Delete - to be fixed (Moshe wrote)
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

// update - to be fixed (Moshe wrote)
updateNotification = async (req, res, next) => {
    try{
    const body = req.body
    if (!body) {
        const error = new Error('You must provide a body to update')
        error.status = 400
        throw error
    }

        const notification = await Notification.findOneAndUpdate({_id: body._id},{$set:body})
        if (!notification) {
            const error = new Error('Notification not found!')
            error.status = 404
            throw error
        }
        notification.$set(body.notification_text)
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
 


getNotificationBy = async (req, res, next) => {
    try
    {
        const body = req.body
        const notification = await Notification.findById(body._id)
        if(!notification){
            const error = new Error ('Notification not found')
            error.status =404
            throw error
        }
        return res.status(200).json({success :true , data : notification})
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({success : false , error : e.message})
    }
}

// inbox 
getNotificationBySenderName = async (req, res, next) => {
    try
    {
        const body = req.body
        const notification = await Notification.find({sender_id : body.sender_id})
        if(!notification.length){
            const error = new Error ('There are no notifications from ' + body.sender_id)
            error.status =404
            throw error
        }
        return res.status(200).json({success :true , data : notification})
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({success : false , error : e.message})
    }
}
 // outbox 
 getNotificationByRecieverName = async (req, res, next) => {
    try
    {
        const body = req.body
        const notification = await Notification.find({receiver_id : body.receiver_id})
        if(!notification.length){
            const error = new Error ('There are no notifications to ' + body.receiver_id)
            error.status =404
            throw error
        }
        return res.status(200).json({success :true , data : notification})
    }
    catch(e){
        console.log(e)
        return res.status(e.status).json({success : false , error : e.message})
    }
}
module.exports = {
    createNotification,
    getNotificationBy,
    updateNotification,
    deleteNotification,
    getNotificationBySenderName,
    getNotificationByRecieverName

}