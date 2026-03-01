const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String },
  grade: { type: String },
  province: { type: String },
  streak: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
