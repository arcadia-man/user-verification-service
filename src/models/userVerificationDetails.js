const mongoose = require("mongoose");

const userVerificationDetailsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  country: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  occupation: { type: String },
  idProof: [
    {
      name: { type: String, required: true },
      docUrl: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model(
  "UserVerificationDetails",
  userVerificationDetailsSchema
);
