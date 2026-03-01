const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();
require('./config/passport');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', require('./routes/api'));



// Ensure the server binds to 0.0.0.0 for Render compatibility

 => {
  console.log(`🚀 AI Tutor API successfully bound and running on port ${PORT}`);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 AI Tutor API successfully bound and running on port ${PORT}`);
});
