// backend/controllers/moduleController.js
const Module = require('../models/module');

// Create module
exports.create = async (req, res) => {
  try { const doc = await Module.create(req.body); res.status(201).json(doc); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

// List modules (optionally by courseId)
exports.list = async (req, res) => {
  const q = req.query.courseId ? { courseId: req.query.courseId } : {};
  const docs = await Module.find(q).sort({ order: 1 });
  res.json(docs);
};

exports.getOne = async (req, res) => {
  const doc = await Module.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

exports.update = async (req, res) => {
  const doc = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
};

exports.remove = async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
