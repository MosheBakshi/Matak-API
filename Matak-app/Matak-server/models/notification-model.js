//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

//names
const Notification = new Schema(
{
        notification_text: { type: String, required: true },
        receiver_id: { type: String, required: true },
        sender_id: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now},
      
  },
  { timestamps: true },
)

module.exports = mongoose.model('Notification', Notification)