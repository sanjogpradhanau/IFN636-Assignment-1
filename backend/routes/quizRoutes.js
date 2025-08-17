const router = require('express').Router();
const qz = require('../controllers/quizController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);                 // protect all quiz routes

router.post('/', qz.create);      // Create
router.get('/', qz.list);         // Read (supports ?moduleId=...)
router.get('/:id', qz.getOne);    // Read one
router.put('/:id', qz.update);    // Update
router.delete('/:id', qz.remove); // Delete

module.exports = router;
