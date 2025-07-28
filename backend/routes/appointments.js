const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// Book an appointment (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { patient, doctor, date, reason } = req.body;
    const appointment = new Appointment({ patient, doctor, date, reason });
    await appointment.save();
    res.json({ message: 'Appointment booked!', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
});

// Get all appointments (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
});

module.exports = router;