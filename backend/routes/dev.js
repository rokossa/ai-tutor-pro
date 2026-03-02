const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// GET /api/dev/test-student
// A backdoor to instantly generate a Magic Link for testing the UI
router.get('/test-student', (req, res) => {
  // We are mocking a token specifically tailored for Alexandre
  const payload = {
    id: 'test_student_001',
    parentId: 'test_parent_001',
    role: 'student',
    name: 'Alexandre',
    grade: 8
  };

  const secret = process.env.JWT_SECRET || 'temporary_development_secret_key';
  
  // Create a valid token that bypasses the login screen
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });

  const frontendUrl = process.env.FRONTEND_URL || 'https://ai-tutor-pro-k88k.onrender.com';
  const magicLink = `${frontendUrl}/magic-login?token=${token}`;

  // Output a simple, clickable HTML interface
  res.send(`
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 50px auto; text-align: center; padding: 40px; background: #F8F9FA; border-radius: 16px; border: 1px solid #E2E8F0;">
      <h1 style="color: #0F172A; margin-bottom: 8px;">🧪 Developer Tools</h1>
      <p style="color: #64748B; font-size: 18px; margin-bottom: 32px;">Test Student Profile Generated</p>

      <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 32px; text-align: left;">
        <p><strong>Name:</strong> Alexandre</p>
        <p><strong>Role:</strong> Student</p>
        <p><strong>Curriculum:</strong> Grade 8 Math</p>
        <p><strong>Status:</strong> Ready for Practice</p>
      </div>

      <a href="${magicLink}" target="_blank" style="display: inline-block; background: #4338CA; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        Launch Student Dashboard &rarr;
      </a>
    </div>
  `);
});

module.exports = router;
