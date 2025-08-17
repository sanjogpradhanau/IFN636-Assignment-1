// backend/models/Attempt.js
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now }
}, { timestamps: true });

attemptSchema.index({ userId: 1, quizId: 1, attemptedAt: 1 });
module.exports = mongoose.model('Attempt', attemptSchema);
