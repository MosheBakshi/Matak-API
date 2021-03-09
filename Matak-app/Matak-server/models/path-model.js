//Require Mongoose
const mongoose = require('mongoose')
const GeoJSON = require('geojson')

//Define a schema
const Schema = mongoose.Schema



const Path = new Schema(
{
      Array_Of_Points: { type: GeoJSON, required: true}, // not done, need to be decided by the group how to parse the data
      Terms_Text: { type: String, required: true },
      Approval_User_Id: { type: String, required: false , default: "None"},
      Path_Name: { type: String, required: true },
      // Applicant_User_Id: { type: String, required: true , default: "None"},
      // Start_Date: { type: Date, required: true},
      // End_Date: { type: Date, required: true},
      Reason_Text: { type: String, required: true},
      // Involved_Organ_Array: {type: [String], required: true, default: "None"},
      // Escort_Organ_Array: {type: [String], required: true, default: "None"},
      // Vehicles_Id_Involved_Array: { type: [String], required: false, default: "On foot"},
      Status_Name: {type: String, required: true, default: "Submitted"},
      Is_Permanent: { type: Boolean, required: true},
      Remarks: { type: String, required: true},
      Files_Path_Array : { type: [String]}
  },
  { timestamps: true },
)

module.exports = mongoose.model('paths', Path)