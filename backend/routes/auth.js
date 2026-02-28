const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Helper function to generate token and redirect to frontend
const handleOAuthLogin = (req, res) => {
  // Generate a secure JWT containing the user payload
  const token = jwt.sign(req.user, process.env.JWT_SECRET || 'evolveai_hackathon_secret', { expiresIn: '7d' });
  
  // Redirect back to the React app's AuthSuccess route
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/auth-success?token=${token}`);
};

// --- Standard Email/Password Auth (Placeholder) ---
router.post('/register', (req, res) => res.status(200).json({ success: true, message: 'Email registration hit' }));
router.post('/login', (req, res) => res.status(200).json({ success: true, message: 'Email login hit' }));

// --- Google OAuth Routes ---
// 1. Redirects user to Google's consent screen
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

// 2. Google redirects back here with the authorization code
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), handleOAuthLogin);

// --- Facebook OAuth Routes ---
// 1. Redirects user to Facebook's consent screen
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));

// 2. Facebook redirects back here with the authorization code
router.get('/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: '/login' }), handleOAuthLogin);

module.exports = router;
