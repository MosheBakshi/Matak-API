const Notification = require('../models/notification-model')

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
    getNotificationById
}