// backend/controllers/enrollmentController.js
const Enrollment = require('../models/enrollment');

// Enrol current user to a course
exports.enrol = async (req, res) => {
  try {
    const doc = await Enrollment.create({ userId: req.user.id, courseId: req.body.courseId });
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// List my enrollments
exports.mine = async (req, res) => {
  const docs = await Enrollment.find({ userId: req.user.id }).sort('-createdAt');
  res.json(docs);
};
