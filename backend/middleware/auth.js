const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body);

  try {
    const {
      role,
      fullName,
      username,
      phone,
      password,
      dob,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      licenseNumber,
      specialization,
      experience,
      clinicName,
      clinicAddress
    } = req.body;

    // Validate required fields
    if (!role || !fullName || !username || !phone || !password || !dob || !gender || !address) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Validate role
    if (!['patient', 'doctor'].includes(role)) {
      return res.status(400).json({ message: 'Role must be patient or doctor.' });
    }

    // Convert dob to Date object and validate
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth.' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    // Prepare user data object
    const userData = {
      role,
      fullName,
      username,
      phone,
      password: hashedPassword,
      dob: dobDate,
      gender,
      address
    };

    if (role === 'patient') {
      userData.emergencyContact = emergencyContact || '';
      userData.medicalHistory = medicalHistory || '';
    } else if (role === 'doctor') {
      userData.licenseNumber = licenseNumber || '';
      userData.specialization = specialization || '';
      userData.experience = Number(experience) || 0;
      userData.clinicName = clinicName || '';
      userData.clinicAddress = clinicAddress || '';
    }

    const newUser = new User(userData);
    await newUser.save();
    console.log('New user saved:', newUser);

    return res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
});

module.exports = router;
