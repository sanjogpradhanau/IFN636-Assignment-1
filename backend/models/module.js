// backend/models/Module.js
const mongoose = require('mongoose');

// A course contains multiple modules
const moduleSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },     // module title
  contentUrl: String,                          // link to content/video
  order: { type: Number, default: 1 }          // sequence in course
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
