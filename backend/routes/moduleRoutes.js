const router = require('express').Router();
const m = require('../controllers/moduleController');

const authModule = require('../middleware/authMiddleware');
const auth =
  (typeof authModule === 'function') ? authModule :
  (authModule && typeof authModule.protect === 'function') ? authModule.protect :
  (authModule && typeof authModule.default === 'function') ? authModule.default :
  null;

if (!auth) throw new Error('Auth middleware not found or not a function. Check backend/middleware/authMiddleware.js');

router.use(auth);                 // protect all module routes

router.post('/', m.create);       // Create
router.get('/', m.list);          // Read (supports ?courseId=...)
router.get('/:id', m.getOne);     // Read one
router.put('/:id', m.update);     // Update
router.delete('/:id', m.remove);  // Delete

module.exports = router;
