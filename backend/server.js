require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');
const connectDB = require('./config/db');

const app = express();

// 1. Connect to MongoDB Atlas
connectDB();

// 2. Global Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads
app.use(passport.initialize());

// 3. Health Check Route (Crucial for Render's automated scanner)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AI Tutor Pro API is live.' });
});

// 4. API Routes
// We wrap these in try/catch blocks so if one file is missing or has a typo, 
// the rest of the server stays alive and Render still detects the open port.
try { 
  app.use('/api/auth', require('./routes/auth')); 
} catch(err) { 
  console.log('⚠️ Auth routes skipped or error:', err.message); 
}

try { 
  app.use('/api/family', require('./routes/family')); 
} catch(err) { 
  console.log('⚠️ Family routes skipped or error:', err.message); 
}

try { 
  app.use('/api/ai', require('./routes/ai')); 
} catch(err) { 
  console.log('⚠️ AI routes skipped or error:', err.message); 
}

try { 
  app.use('/api/stripe', require('./routes/stripe')); 
} catch(err) { 
  console.log('⚠️ Stripe routes skipped or error:', err.message); 
}

// 5. The Render-Compliant Port Binding
// '0.0.0.0' explicitly tells the server to listen to the outside internet, not just localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AI Tutor API successfully bound and running on port ${PORT}`);
});
