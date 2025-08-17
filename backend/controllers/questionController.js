// backend/controllers/questionController.js
const Question = require('../models/question');

exports.create = async (req, res) => {
  try { const doc = await Question.create(req.body); res.status(201).json(doc); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.list = async (req, res) => {
  const q = req.query.quizId ? { quizId: req.query.quizId } : {};
  const docs = await Question.find(q).sort('-createdAt');
  res.json(docs);
};

exports.getOne = async (req, res) => {
  const doc = await Question.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

exports.update = async (req, res) => {
  const doc = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
};

exports.remove = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
