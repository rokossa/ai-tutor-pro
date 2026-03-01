const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 1. Send the user to Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. Catch the user coming back from Google
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      // If we made it here, Passport successfully saved/found the user in MongoDB!
      const payload = { 
        id: req.user._id || req.user.id, 
        role: req.user.role || 'parent' 
      };
      
      // Fallback secret prevents fatal crashes if environment variable is missing
      const secret = process.env.JWT_SECRET || 'temporary_development_secret_key';
      const token = jwt.sign(payload, secret, { expiresIn: '7d' });
      
      // Fallback URL ensures we always know where to send the user
      const frontendUrl = process.env.FRONTEND_URL || 'https://ai-tutor-pro-k88k.onrender.com';
      
      res.redirect(`${frontendUrl}/auth-success?token=${token}`);
    } catch (error) {
      console.error("🔥 JWT or Redirect Error:", error);
      res.status(500).json({ 
        error: "Failed to generate token or redirect", 
        details: error.message 
      });
    }
  }
);

module.exports = router;
