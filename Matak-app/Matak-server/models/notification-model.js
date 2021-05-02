//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

//names
const Notification = new Schema(
{
        Notification_Text: { type: String, required: true },//New Path,Update Path
        Path_Id : { type: String, required: true },
        Sender_Id: { type: String, required: true },
        Sender_Organization: { type: String, required: true },
        Reciver_Organization: {type: String, required: true},
        Read: {type : Boolean, require : false,default: false} // default false
        
  },
  { timestamps: true },
)

module.exports = mongoose.model('Notification', Notification)