// backend/models/Certificate.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
  issuedAt: { type: Date, default: Date.now },
  verifyCode: { type: String, unique: true, required: true } // public verifier
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
