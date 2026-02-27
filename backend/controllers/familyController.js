const Family = require('../models/Family');
const crypto = require('crypto');

exports.generateStudentInvite = async (req, res) => {
  try {
    const parentId = req.user.id; 
    let family = await Family.findOne({ primaryParent: parentId });
    if (!family) {
      family = new Family({ primaryParent: parentId });
    }

    const inviteCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    family.inviteCodes.push({ code: inviteCode, roleTarget: 'student', expiresAt });
    await family.save();

    res.status(200).json({ success: true, inviteCode, message: "Student invite code generated successfully." });
  } catch (error) {
    console.error("Invite Generation Error:", error);
    res.status(500).json({ error: "Failed to generate invite code." });
  }
};
