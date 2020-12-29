//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Status = new Schema(
{
        Status_Name: { type: String, required: true },
        Color: { type: String, required: true },   
},)

module.exports = mongoose.model('status', Status)