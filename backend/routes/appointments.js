const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();
// const authenticateToken = require('../middleware/auth');
const authenticateToken = require('../middleware/authenticationToken');

// Book an appointment (only patients can)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can book appointments' });
    }

    const { doctor, date, time, reason } = req.body;

    const appointment = new Appointment({
      patient: req.user.id,
      doctor,
      date,
      time,
      reason,
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked!', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
});

// Get all appointments based on role
router.get('/', authenticateToken, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'patient') {
      filter.patient = req.user.id;
    } else if (req.user.role === 'doctor') {
      filter.doctor = req.user.id;
    }

    const appointments = await Appointment.find(filter)
      .populate('patient', 'fullName phone')
      .populate('doctor', 'fullName specialization');

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
});

module.exports = router;


// const express = require('express');
// const Appointment = require('../models/Appointment');
// const router = express.Router();
// const authenticateToken = require('../middleware/auth');

// // Book an appointment (protected)
// router.post('/', authenticateToken, async (req, res) => {
//   try {
//     const { patient, doctor, date, reason } = req.body;
//     const appointment = new Appointment({ patient, doctor, date, reason });
//     await appointment.save();
//     res.json({ message: 'Appointment booked!', appointment });
//   } catch (err) {
//     res.status(500).json({ message: 'Error booking appointment', error: err.message });
//   }
// });

// // Get all appointments (protected)
// router.get('/', authenticateToken, async (req, res) => {
//   try {
//     const appointments = await Appointment.find();
//     res.json(appointments);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching appointments', error: err.message });
//   }
// });

// module.exports = router;