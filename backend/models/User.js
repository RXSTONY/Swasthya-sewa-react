const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['patient', 'doctor'] },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // email used here
  phone: { type: String, required:true, unique:true },
  password: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String },
  address: { type: String },
  // patient fields
  emergencyContact: { type: String },
  medicalHistory: { type: String },
  // doctor fields
  licenseNumber: { type: String },
  specialization: { type: String },
  experience: { type: Number },
  clinicName: { type: String },
  clinicAddress: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
