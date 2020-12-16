//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Status = new Schema(
{
        Status_Name: { type: String, required: true, default: 'check' },
        Color: { type: String, required: true, default: 'check' },   
},)

module.exports = mongoose.model('status', Status)