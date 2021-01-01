//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Car = new Schema(
{
        Type: { type: String, required: true },
        Car_Model: { type: String, required: true },
        Color: { type: String, required: true },
        Organization_Name: { type: String, required: true },
        Liecene_Number: { type: String, required: true , unique: true},
        Contact_Name: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Cars', Car)