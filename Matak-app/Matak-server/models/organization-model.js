//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Organization = new Schema(
{
        name: { type: String, required: true },
        contact: { type: String, required: true },
        mobile: { type: String, required: true },
        email: { type: String, required: true },
        fax: { type: String, required: false, default: "None"},
        country: { type: String, required: true },
  },
  { timestamps: true },
)



module.exports = mongoose.model('Organizations', Organization)