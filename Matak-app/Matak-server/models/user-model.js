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
        First_Name: { type: String, required: true },
        Last_Name: { type: String, required: true },            
        Mobile: { type: String, required: true },
        Email: { type: String, required: true },
        Organization_Name: { type: String, required: true},
        Username: { type: String, required: true, unique: true },
        Password: {
          type: String,
          required: true,
          set: setPassword
        },
        User_type: { type: String, enum: ['Arbel','Matak','Admin'], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)