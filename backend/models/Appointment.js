const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g. "10:30 AM"
  reason: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//   patient: { type: String, required: true }, // or ObjectId if you want to reference User
//   doctor: { type: String, required: true },  // or ObjectId if you want to reference User
//   date: { type: Date, required: true },
//   reason: { type: String },
//   status: { type: String, default: 'pending' }
// });

// module.exports = mongoose.model('Appointment', appointmentSchema);