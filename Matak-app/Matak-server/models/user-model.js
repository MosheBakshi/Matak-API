//Require Mongoose
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
//Define a schema
const Schema = mongoose.Schema


function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}


const User = new Schema(
    {
        Name: {
            type: {
              type: String, // Don't do `{ name: { type: String } }`
              enum: ['Name'], // 'name.type' must be 'Name'
              required: true
            },
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },            
          },
        Mobile: { type: String, required: true },
        Email: { type: String, required: true },
        Organ_name: { type: String, required: false , default: "None"},
        Username: { type: String, required: true },
        Password: {
          type: String,
          required: true,
          set: setPassword
        },
        User_type: { type: String, enum: ['Arbel','Matak'], required: false } // 'usertype.type' must be 'Arbel'/'Matak'
    },
    { timestamps: true },
)

module.exports = mongoose.model('Users', User)