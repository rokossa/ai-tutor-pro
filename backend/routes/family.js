const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

// POST /api/family/generate-magic-link
// Generates a secure, passwordless login URL for a student
router.post('/generate-magic-link', protect, async (req, res) => {
  try {
    const { studentId, studentName } = req.body;
    
    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required to generate a link.' });
    }

    // This payload officially tags this token with the 'student' role
    const payload = {
      id: studentId,
      parentId: req.user.id,
      role: 'student',
      name: studentName
    };

    const secret = process.env.JWT_SECRET || 'temporary_development_secret_key';
    
    // Student links are set to last for 90 days
    const token = jwt.sign(payload, secret, { expiresIn: '90d' });

    // Ensure we point to the correct frontend URL
    const frontendUrl = process.env.FRONTEND_URL || 'https://ai-tutor-pro-k88k.onrender.com';
    const magicLink = `${frontendUrl}/magic-login?token=${token}`;

    res.json({ magicLink, token });
  } catch (error) {
    console.error("🔥 Magic Link Error:", error);
    res.status(500).json({ error: 'Failed to generate magic link', details: error.message });
  }
});

module.exports = router;
