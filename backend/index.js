require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:3001' })); // or 3001 if that's your frontend port
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/appointments', appointmentRoutes);


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});