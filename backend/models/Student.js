const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  overallMastery: Number,
  subjects: Array,     // Array of subject objects
  curriculum: Object   // Deeply nested object holding domains and skills
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
