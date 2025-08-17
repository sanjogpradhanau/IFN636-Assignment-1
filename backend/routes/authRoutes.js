const router = require('express').Router();
const { register, login, me } = require('../controllers/authController');

// resolve auth middleware regardless of export style
const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!register || !login) {
  throw new Error('authController exports missing. Ensure controllers/authController.js exports { register, login, me }');
}
if (!auth) {
  // me route below uses auth
  console.warn('Auth middleware not found/function; /me will fail until fixed.');
}

// PUBLIC routes
router.post('/register', register);  // POST /api/auth/register
router.post('/login', login);        // POST /api/auth/login

// PRIVATE route
if (auth) router.get('/me', auth, me);    // GET /api/auth/me

module.exports = router;
