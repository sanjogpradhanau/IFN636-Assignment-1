// backend/models/Enrollment.js
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['active','completed'], default: 'active' },
  progressPercent: { type: Number, default: 0 }
}, { timestamps: true });

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
module.exports = mongoose.model('Enrollment', enrollmentSchema);
