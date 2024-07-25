const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: String,
    name: String,
    age: Number,
    mobileNo: Number,
    email: {
      type:String,
      default:NaN
    },
    date: {
      type:Date,
      default: NaN
    },
    address: String,
    disease: String,
    fees: Number,
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("patients", patientSchema);

module.exports = Patient;
