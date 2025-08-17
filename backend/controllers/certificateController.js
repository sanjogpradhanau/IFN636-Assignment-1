// backend/controllers/certificateController.js
const crypto = require('crypto');
const Attempt = require('../models/attempt');
const Enrollment = require('../models/enrollment');
const Module = require('../models/module');
const Quiz = require('../models/quiz');
const Course = require('../models/course');
const Certificate = require('../models/certificate');

// get course avg quiz score for user
async function averageScore(userId, courseId) {
  const mods = await Module.find({ courseId }).select('_id');
  const quizzes = await Quiz.find({ moduleId: { $in: mods.map(m => m._id) } }).select('_id');
  if (!quizzes.length) return 100; // no quizzes => treat as pass
  const attempts = await Attempt.find({ userId, quizId: { $in: quizzes.map(q => q._id) } });
  if (!attempts.length) return 0;
  const sum = attempts.reduce((s, a) => s + a.score, 0);
  return Math.round(sum / attempts.length);
}

// Issue certificate if eligible
exports.issueIfEligible = async (req, res) => {
  const enr = await Enrollment.findById(req.body.enrollmentId);
  if (!enr || String(enr.userId) !== String(req.user.id)) return res.status(404).json({ message: 'Enrollment not found' });
  const course = await Course.findById(enr.courseId);
  const avg = await averageScore(req.user.id, enr.courseId);
  if (enr.progressPercent === 100 && avg >= course.passingScore) {
    const cert = await Certificate.create({ enrollmentId: enr._id, verifyCode: crypto.randomUUID() });
    return res.status(201).json(cert);
  }
  res.status(400).json({ message: 'Not eligible yet' });
};

// Verify certificate publicly
exports.verify = async (req, res) => {
  const cert = await Certificate.findOne({ verifyCode: req.params.code });
  if (!cert) return res.status(404).json({ message: 'Invalid code' });
  res.json({ valid: true, certId: cert._id, issuedAt: cert.issuedAt });
};
