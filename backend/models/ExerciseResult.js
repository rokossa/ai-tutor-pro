const mongoose = require('mongoose');

const ExerciseResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseCode: { type: String, required: true },
  exerciseType: { type: String, required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  isCorrect: { type: Boolean, required: true },
  timeSpentSeconds: { type: Number, required: true },
  geminiFeedback: { en: String, fr: String },
  zScore: { type: Number, default: null }
}, { timestamps: true });

module.exports = mongoose.model('ExerciseResult', ExerciseResultSchema);
