const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this model has all fields listed below
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'defaultsecret';

// ✅ Signup route
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object from req.body
    const userData = {
      ...req.body,
      password: hashedPassword
    };

    // Create and save user
    const user = new User(userData);
    await user.save();

    return res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Server error during signup' });
  }
});

// ✅ Login route (still included here for completeness)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ username, role: user.role }, SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
