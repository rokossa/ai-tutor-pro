const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  authProvider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
  profile: {
    firstName: String,
    lastName: String,
    preferredLanguage: { type: String, enum: ['en', 'fr'], default: 'en' }
  },
  stripeCustomerId: String,
  subscriptionStatus: { type: String, enum: ['trialing', 'active', 'past_due', 'canceled', 'incomplete'], default: 'trialing' },
  trialEndsAt: Date,
  enrolledCourses: [{ type: String }],
  rollingGPA: { type: Number, default: 0.0, max: 4.0 },
  dailyPracticeMinutes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
