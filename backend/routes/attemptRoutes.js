const router = require('express').Router();
const a = require('../controllers/attemptController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);               // protect all attempt routes

router.post('/', a.record);     // Create attempt
router.get('/mine', a.mine);    // Read my attempts

module.exports = router;
