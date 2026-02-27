const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.registerParent = async (req, res) => {
  try {
    const { email, password, firstName, lastName, region } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = new User({
      email, passwordHash, role: 'parent',
      profile: { firstName, lastName, region }
    });
    await user.save();

    const token = crypto.randomBytes(32).toString('hex');
    await new VerificationToken({ userId: user._id, token }).save();

    console.log(`Verification link: http://localhost:5173/verify-email?token=${token}`);
    res.status(201).json({ success: true, message: "Registration successful." });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration." });
  }
};
