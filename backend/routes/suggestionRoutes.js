const router = require('express').Router();
const s = require('../controllers/suggestionController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);                   // protect all suggestion routes

router.post('/generate', s.generate); // Create/generate suggestions
router.get('/mine', s.mine);          // Read my suggestions

module.exports = router;
