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

deleteNotification  = async (req, res, next) => {
    const body = req.body
    await Notification.findOneAndDelete({ _id: body._id }, (err, notification) => {
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

getNotificationBy = async (req, res, next) => {

        const body = req.body
        await Notification.findById(body._id, (err, notification) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
        return res.status(200).json({success :true , data : notification})
    })
    .catch(e => {
        console.log(e)
        return res.status(e.status).json({success : false , error : e.message})})
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