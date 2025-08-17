// backend/models/ProgressLog.js
const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  isCompleted: { type: Boolean, default: false },  // completion flag
  timeSpentMin: { type: Number, default: 0 }       // optional time tracking
}, { timestamps: true });

progressLogSchema.index({ userId: 1, moduleId: 1 }, { unique: true });
module.exports = mongoose.model('ProgressLog', progressLogSchema);
