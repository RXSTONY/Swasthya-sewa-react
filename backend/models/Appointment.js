const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true }, // or ObjectId if you want to reference User
  doctor: { type: String, required: true },  // or ObjectId if you want to reference User
  date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);