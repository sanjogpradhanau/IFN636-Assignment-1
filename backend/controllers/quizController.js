// backend/controllers/quizController.js
const Quiz = require('../models/quiz');

exports.create = async (req, res) => {
  try { const doc = await Quiz.create(req.body); res.status(201).json(doc); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.list = async (req, res) => {
  const q = req.query.moduleId ? { moduleId: req.query.moduleId } : {};
  const docs = await Quiz.find(q).sort('-createdAt');
  res.json(docs);
};

exports.getOne = async (req, res) => {
  const doc = await Quiz.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

exports.update = async (req, res) => {
  const doc = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
};

exports.remove = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
