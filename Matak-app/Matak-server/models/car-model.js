//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

//names
const Car = new Schema(
{
        type: { type: String, required: true },
        car_model: { type: String, required: true },
        color: { type: String, required: true },
        organization_id: { type: String, required: true },//to be fixed
        liecene_number: { type: String, required: true},
        contact_name: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Cars', Car)