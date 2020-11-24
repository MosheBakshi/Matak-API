//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Status = new Schema(
{
        name: { type: String, required: true },
        color: { type: [Number], required: true },
       
},
  { timestamps: true },
)

module.exports = mongoose.model('Status', Status)