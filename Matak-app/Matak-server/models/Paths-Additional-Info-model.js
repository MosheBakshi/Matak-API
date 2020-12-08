//Require Mongoose
const mongoose = require('mongoose')

//Define a schema
const Schema = mongoose.Schema

const PathInfo = new Schema(
{   
    idDB: {type: String, required: false},
    Path_Name: { type: String, required: true },
    Applicant_user_id: { type: String, required: true , default: "None"},
    // Start_Date: { type: Date, required: true},
    // End_Date: { type: Date, required: true},
    Reason_Text: { type: String, required: true},
    Involved_Organ_Array: {type: [String], required: true, default: "None"},
    Escort_Organ_Array: {type: [String], required: true, default: "None"},
    Vehicles_Id_Involved_Array: { type: [String], required: true, default: "On foot"},
    STATUS_ID: {type: Number, required: true, default: 1},
    Route_Type: { type: String, required: true, default: "Casual"},
    Remarks: { type: String, required: true}
  },
  { timestamps: true },
)

module.exports = mongoose.model('Paths-Additional-Info-model', PathInfo)