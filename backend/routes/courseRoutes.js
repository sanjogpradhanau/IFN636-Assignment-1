const router = require('express').Router();
const c = require('../controllers/courseController');

// Resolve auth middleware regardless of export shape
const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);                 // protect all course routes

router.post('/', c.create);       // Create
router.get('/', c.list);          // Read all
router.get('/:id', c.getOne);     // Read one
router.put('/:id', c.update);     // Update
router.delete('/:id', c.remove);  // Delete

module.exports = router;
