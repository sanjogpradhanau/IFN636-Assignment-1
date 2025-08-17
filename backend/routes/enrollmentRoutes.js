const router = require('express').Router();
const e = require('../controllers/enrollmentController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);                 // protect all enrollment routes

router.post('/enrol', e.enrol);   // Create enrollment
router.get('/mine', e.mine);      // Read my enrollments

module.exports = router;
