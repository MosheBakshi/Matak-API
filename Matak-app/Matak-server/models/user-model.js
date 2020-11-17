//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema




const User = new Schema(
    {
        name: {
            type: {
              type: String, // Don't do `{ name: { type: String } }`
              enum: ['Name'], // 'name.type' must be 'Name'
              required: true
            },
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },            
          },
        mobile: { type: String, required: true },
        email: { type: String, required: true },
        organ_id: { type: String, required: false , default: "None"},
        username: { type: String, required: true },
        password: { type: String, required: true },
        usertype: { type: String, enum: ['Arbel','Matak'], required: false } // 'usertype.type' must be 'Arbel'/'Matak'
    },
    { timestamps: true },
)

module.exports = mongoose.model('Users', User)