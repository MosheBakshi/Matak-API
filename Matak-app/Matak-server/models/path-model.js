//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Path = new Schema(
{
      Array_of_Points: {type:[[Number]], required: true},
      path_from: {type: [Number], required:false
          // type: {
          //   type: String, // Don't do `{ location: { type: String } }`
          //   enum: ['Point'], // 'location.type' must be 'Point'
          //   required: true
          // },
          // coordinates: {
          //   type: [Number],
          //   required: true
          // }
        },
      path_to: {type: [Number], required:false
          // type: {
          //   type: String, // Don't do `{ location: { type: String } }`
          //   enum: ['Point'], // 'location.type' must be 'Point'
          //   required: true
          // },
          // coordinates: {
          //   type: [Number],
          //   required: true
          // }
        },
      terms_text: { type: String, required: true },
      approval_user_id: { type: String, required: false , default: "None"},
  },
  { timestamps: true },
)

module.exports = mongoose.model('paths', Path)