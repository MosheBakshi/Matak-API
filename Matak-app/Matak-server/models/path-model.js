//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const Path = new Schema(
    {
        // path_from: { type: JSONGEO, required: true }, // to be continued
        // path_to: { type: JSONGEO, required: true }, // to be continued
        terms_text: { type: String, required: true },
        approval_user_id: { type: Number, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('paths', Path)