const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
  primaryParent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coParents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tutors: [{
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    permissions: {
      canViewProgress: { type: Boolean, default: true },
      canSendMessages: { type: Boolean, default: false }
    }
  }],
  inviteCodes: [{
    code: String,
    roleTarget: { type: String, enum: ['student', 'co-parent', 'tutor'] },
    expiresAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Family', FamilySchema);
