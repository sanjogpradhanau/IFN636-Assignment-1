// backend/controllers/progressController.js
const ProgressLog = require('../models/progresslog');
const Module = require('../models/module');
const Enrollment = require('../models/enrollment');

// Helper: recompute course progress % for a user
async function recomputeEnrollmentPercent(userId, courseId) {
  const total = await Module.countDocuments({ courseId });
  if (!total) return;
  const modules = await Module.find({ courseId }).select('_id');
  const moduleIds = modules.map(m => m._id);
  const completed = await ProgressLog.countDocuments({ userId, moduleId: { $in: moduleIds }, isCompleted: true });
  const percent = Math.round((completed / total) * 100);
  await Enrollment.findOneAndUpdate({ userId, courseId }, { progressPercent: percent });
}

// Upsert a progress log for a module
exports.upsert = async (req, res) => {
  try {
    const { moduleId, isCompleted, timeSpentMin = 0, courseId } = req.body;
    const doc = await ProgressLog.findOneAndUpdate(
      { userId: req.user.id, moduleId },
      { isCompleted, timeSpentMin },
      { upsert: true, new: true }
    );
    if (courseId) await recomputeEnrollmentPercent(req.user.id, courseId);
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// List my progress logs
exports.mine = async (req, res) => {
  const docs = await ProgressLog.find({ userId: req.user.id }).sort('-updatedAt');
  res.json(docs);
};
