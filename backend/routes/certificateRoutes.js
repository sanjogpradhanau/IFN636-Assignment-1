const router = require('express').Router();
const c = require('../controllers/certificateController');

// Resolve auth middleware
const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

// PUBLIC verify endpoint first (no auth)
router.get('/verify/:code', c.verify); // public verify by code

// Protect the rest (issuing certificate requires logged-in user)
router.use(auth);
router.post('/issue', c.issueIfEligible); // issue if eligible

module.exports = router;
