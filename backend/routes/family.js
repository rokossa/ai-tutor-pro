const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// POST /api/family/send-invite
router.post('/send-invite', async (req, res) => {
  try {
    const { childEmail, childName, parentName, parentEmail, grade, region } = req.body;
    
    // In a real app, you generate a secure, single-use JWT for this link
    const magicLink = `http://localhost:5173/student-join?code=MAGIC123`;

    // Dispatch the emails concurrently
    await Promise.all([
      emailService.sendStudentInvite(childEmail, childName, parentName, grade, region, magicLink),
      emailService.sendParentConfirmation(parentEmail, childName)
    ]);

    res.status(200).json({ success: true, message: "Invitations dispatched successfully." });
  } catch (error) {
    console.error("Failed to send invitations:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
});

// POST /api/family/trigger-nudge (Usually called by a Cron Job)
router.post('/trigger-nudge', async (req, res) => {
  try {
    const { childEmail, childName, parentName } = req.body;
    const magicLink = `http://localhost:5173/student-join?code=MAGIC123`;
    
    await emailService.sendStudentNudge(childEmail, childName, parentName, magicLink);
    res.status(200).json({ success: true, message: "Nudge dispatched successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to send nudge." });
  }
});

module.exports = router;
