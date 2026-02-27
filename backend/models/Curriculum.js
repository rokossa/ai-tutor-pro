const mongoose = require('mongoose');

const CurriculumSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  region: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  programType: { type: String, enum: ['Regular', 'AP', 'IB'], default: 'Regular' },
  subject: { type: String, required: true },
  systemPromptContext: { type: String, required: true }
});

module.exports = mongoose.model('Curriculum', CurriculumSchema);
