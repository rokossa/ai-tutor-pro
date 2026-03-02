const User = require('../models/User');
const { sendWelcomeEmail, sendTutorAssignmentEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, tutorId } = req.body;
    const user = await User.create({ name, email, password, role, assignedTutor: tutorId });
    
    // LIVE TRIGGER: Send the nice onboarding email immediately
    await sendWelcomeEmail(user);
    
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignTutor = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;
    // Logic to update DB and then...
    await sendTutorAssignmentEmail(studentId, tutorId);
    res.json({ success: true, message: "Tutor assigned and notified." });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
