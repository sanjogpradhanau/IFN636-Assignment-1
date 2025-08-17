
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
//app.use('/api/tasks', require('./routes/taskRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }


module.exports = app

// health (optional but useful)
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// mount AUTH first
app.use('/api/auth', require('./routes/authRoutes'));

// mount your other feature routes AFTER auth exists
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/modules', require('./routes/moduleRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/attempts', require('./routes/attemptRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/suggestions', require('./routes/suggestionRoutes'));

// connect to Mongo and start server (use your existing code here)
