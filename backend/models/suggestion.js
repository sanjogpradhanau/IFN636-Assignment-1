// backend/models/Suggestion.js
const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }, // optional target
  message: { type: String, required: true },
  source: { type: String, enum: ['auto','manual'], default: 'auto' }
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);
