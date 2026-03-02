const crypto = require('crypto');
const User = require('../models/User');
const { sendTutorInviteEmail } = require('../services/emailService');

exports.generateInviteLink = async (req, res) => {
  try {
    const { studentId, tutorEmail } = req.body;
    const inviteToken = crypto.randomBytes(32).toString('hex');
    
    // Logic to store the token and link it to the student
    const inviteUrl = `https://ai-tutor-pro-k88k.onrender.com/register?token=${inviteToken}&role=tutor`;

    // Trigger the personalized HTML email to Ms. Patel
    await sendTutorInviteEmail(tutorEmail, inviteUrl, req.user.name);

    res.json({ success: true, message: "Handshake invite sent to tutor." });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate tutor invite." });
  }
};
