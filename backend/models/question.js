// backend/models/Question.js
const mongoose = require('mongoose');

// MCQ question; answerIndex points to correct option
const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  options: { type: [String], required: true },
  answerIndex: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
