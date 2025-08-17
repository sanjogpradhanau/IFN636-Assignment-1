// backend/controllers/courseController.js
const Course = require('../models/course');

// Create course
exports.create = async (req, res) => {
  try {
    const doc = await Course.create({ ...req.body, createdBy: req.user.id }); // use JWT user
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// List all courses
exports.list = async (_req, res) => {
  const docs = await Course.find().sort('-createdAt');
  res.json(docs);
};

// Get one course
exports.getOne = async (req, res) => {
  const doc = await Course.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

// Update a course
exports.update = async (req, res) => {
  const doc = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
};

// Delete a course
exports.remove = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
