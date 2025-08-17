// backend/models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  title: { type: String, required: true },
  totalMarks: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
