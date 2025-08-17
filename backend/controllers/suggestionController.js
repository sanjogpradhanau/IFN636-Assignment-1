// backend/controllers/suggestionController.js
const Suggestion = require('../models/suggestion');
const Attempt = require('../models/attempt');

// Generate simple suggestions
exports.generate = async (req, res) => {
  const atts = await Attempt.find({ userId: req.user.id }).sort('-attemptedAt').limit(10);
  if (!atts.length) {
    const s = await Suggestion.create({ userId: req.user.id, message: 'Try a quiz to unlock personalized tips.' });
    return res.status(201).json([s]);
  }
  const avg = Math.round(atts.reduce((s,a)=>s+a.score,0)/atts.length);
  if (avg < 60) {
    const s = await Suggestion.create({ userId: req.user.id, message: 'Average score < 60. Review weak modules.' });
    return res.status(201).json([s]);
  }
  res.json([]); // nothing to suggest
};

exports.mine = async (req, res) => {
  const docs = await Suggestion.find({ userId: req.user.id }).sort('-createdAt');
  res.json(docs);
};
