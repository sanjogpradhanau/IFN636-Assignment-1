// backend/controllers/attemptController.js
const Attempt = require('../models/attempt');

// Record a quiz attempt
exports.record = async (req, res) => {
  try {
    const { quizId, score } = req.body;             // simple scoring for demo
    const doc = await Attempt.create({ userId: req.user.id, quizId, score });
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// List my attempts
exports.mine = async (req, res) => {
  const docs = await Attempt.find({ userId: req.user.id }).sort('-attemptedAt');
  res.json(docs);
};
