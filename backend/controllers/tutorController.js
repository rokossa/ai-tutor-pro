const User = require('../models/User');
const Family = require('../models/Family');

exports.registerTutor = async (req, res) => {
  try {
    const { email, password, firstName, lastName, subjects, bio, inviteCode } = req.body;
    
    // Verify the invitation link/code exists in a family
    const family = await Family.findOne({ "inviteCodes.code": inviteCode });
    if (!family) return res.status(400).json({ error: "Invalid or expired invitation link." });

    // Create the Tutor User
    const user = new User({
      email,
      passwordHash: password, // In prod, use bcrypt.hash
      role: 'tutor',
      profile: { firstName, lastName, bio, subjectsTaught: subjects }
    });
    await user.save();

    // Link Tutor to Family
    family.tutors.push({ tutorId: user._id, permissions: { canViewProgress: true } });
    // Remove used invite code
    family.inviteCodes = family.inviteCodes.filter(c => c.code !== inviteCode);
    await family.save();

    res.status(201).json({ success: true, message: "Tutor account created and linked to student." });
  } catch (error) {
    res.status(500).json({ error: "Failed to register tutor." });
  }
};
