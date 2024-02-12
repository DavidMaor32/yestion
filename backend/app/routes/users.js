const controller = require('../controllers/users');

const router = require('express').Router();

const cache = require('../middlewares/cache');
const auth = require('../middlewares/auth');

router.post('/', controller.createUser);
router.get('/:username', auth, cache, controller.getUser);
router.get('/', auth, cache, controller.ListUserNames);
router.put('/:username', auth, controller.updateUser);
router.delete('/:username', auth, controller.deleteUser);


module.exports = router; 