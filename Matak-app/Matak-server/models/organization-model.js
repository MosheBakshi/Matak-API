//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Organization = new Schema(
{
        Name: { type: String, required: true },
        Contact: { type: String, required: true },
        Mobile: { type: String, required: true },
        Email: { type: String, required: true },
        Fax: { type: String, required: false, default: "None"},
        Country: { type: String, required: true },
  },
  { timestamps: true },
)



module.exports = mongoose.model('Organizations', Organization)