const dotenv = require('dotenv');
dotenv.config(); // ✅ Load environment variables from .env

// ✅ Debug .env loading
console.log('DEBUG ENV:\n', require('fs').readFileSync('.env', 'utf8'));
console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found. Check your .env file.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// App setup
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
