const router = require('express').Router();
const p = require('../controllers/progressController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);               // protect all progress routes

router.post('/', p.upsert);     // Upsert a log (Create/Update)
router.get('/mine', p.mine);    // Read my logs

module.exports = router;
