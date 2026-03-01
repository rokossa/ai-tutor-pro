const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 1. Send the user to Google (with explicit console tracking)
router.get('/google', (req, res, next) => {
  console.log("➡️ Starting Google Auth flow...");
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// 2. Catch the user coming back from Google (Custom Callback for deep logging)
router.get('/google/callback', (req, res, next) => {
  console.log("⬅️ Received callback from Google. Authenticating...");
  
  // By using a custom callback, we intercept the hidden error instead of letting Express hide it
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      console.error("🔥 PASSPORT STRATEGY ERROR:", err);
      // We also send the error directly to your browser screen so you don't even need the logs!
      return res.status(500).send(`Passport Error: ${err.message}`); 
    }
    if (!user) {
      console.error("⚠️ NO USER RETURNED. Info:", info);
      return res.redirect('/login?error=auth_failed');
    }
    
    console.log(`✅ User authenticated successfully: ${user.email}`);
    req.user = user;
    next();
  })(req, res, next);
}, (req, res) => {
  try {
    const payload = { id: req.user._id || req.user.id, role: req.user.role || 'parent' };
    const secret = process.env.JWT_SECRET || 'temporary_development_secret_key';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    const frontendUrl = process.env.FRONTEND_URL || 'https://ai-tutor-pro-k88k.onrender.com';
    
    console.log("✅ JWT generated. Redirecting to frontend...");
    res.redirect(`${frontendUrl}/auth-success?token=${token}`);
  } catch (error) {
    console.error("🔥 JWT GENERATION ERROR:", error);
    res.status(500).send(`JWT Error: ${error.message}`);
  }
});

module.exports = router;
