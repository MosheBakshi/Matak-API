//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Path = new Schema(
    {
        // path_id: { type: Number, required: true },
        // path_from: { type: JSONGEO, required: true },
        // path_to: { type: JSONGEO, required: true },
        // terms_text: { type: String, required: true },
        // approval_user_id: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('paths', Path)