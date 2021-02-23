//Require Mongoose
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
//Define a schema
const Schema = mongoose.Schema


function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}
function set_User_type(value){
  switch(value){
    case 0:
      return 'Arbel'
    case 1:
      return 'Matak'
    case 2:
      return 'Admin'
  }

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
        User_Type: { type: String, enum: ['Arbel','Matak','Admin'], required: true,set: set_User_type }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)