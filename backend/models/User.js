const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['parent', 'student', 'tutor', 'admin'], 
    required: true 
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    region: String,
    preferredLanguage: { type: String, enum: ['en', 'fr'], default: 'en' },
    bio: String,
    subjectsTaught: [String]
  },
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
  isEmailVerified: { type: Boolean, default: false },
  parentalConsentGiven: { type: Boolean, default: false },
  deletionScheduledAt: { type: Date, default: null },
  stripeCustomerId: String,
  subscriptionStatus: { type: String, enum: ['trialing', 'active', 'canceled', 'none'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
