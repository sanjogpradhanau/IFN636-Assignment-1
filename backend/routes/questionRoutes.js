const router = require('express').Router();
const q = require('../controllers/questionController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);                  // protect all question routes

router.post('/', q.create);        // Create
router.get('/', q.list);           // Read (supports ?quizId=...)
router.get('/:id', q.getOne);      // Read one
router.put('/:id', q.update);      // Update
router.delete('/:id', q.remove);   // Delete

module.exports = router;
