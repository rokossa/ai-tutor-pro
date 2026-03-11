const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({ origin: 'https://ai-tutor-pro-k88k.onrender.com' }));
app.use(express.json());

// Routes
app.use('/api/evaluate', require('./routes/evaluate'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
