//Require Mongoose
const mongoose = require('mongoose')
const GeoJSON = require('geojson')

//Define a schema
const Schema = mongoose.Schema

function setDate(value) {
  return new Date(value)
}

const Path = new Schema(
{
      Array_Of_Points: { type: GeoJSON, required: true },
      Terms_Text: { type: String, required: true },
      // Approval_User_Id: { type: String, required: false , default: "None"},//od meat
      Path_Name: { type: String, required: true },
      Applicant_User_Id: { type: String, required: false },//default dont need to send it
      Start_Date: { type: Date, required: true, set: setDate},
      End_Date: { type: Date, required: true, set: setDate},
      Reason_Text: { type: String, required: true},
      Organization_Name: {type: String, required: false},//default dont need to send it
      Escort_Organ_Array: {type: [String], required: true, default: []},
      Vehicles_Id_Involved_Array: { type: [String], required: false, default: []},
      Status_Name: {type: String, required: false},//default dont need to send it
      Is_Permanent: { type: Boolean, required: true},
      Remarks: { type: String, required: true},
      Files_Path_Array : { type: [String], required: false}
  },
  { timestamps: true , minimize: false}
)

module.exports = mongoose.model('paths', Path)