const dotenv = require('dotenv');
dotenv.config(); // Load .env

const fs = require('fs');
console.log('DEBUG ENV:\n', fs.readFileSync('.env', 'utf8'));
console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoute');
const appointmentRoutes = require('./routes/appointments');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found. Check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Initialize Express
const app = express();

// ✅ Configure CORS to allow credentials
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Add headers manually for flexibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ✅ Body parser middleware
app.use(bodyParser.json());

// ✅ Mount routes
app.use('/api', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
