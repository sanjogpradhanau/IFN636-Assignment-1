// backend/models/Course.js
const mongoose = require('mongoose');

// Course with a minimum passing score (for certificate eligibility)
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },     // course name
  description: String,                         // details
  passingScore: { type: Number, default: 60 }, // min avg quiz score to earn cert
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
