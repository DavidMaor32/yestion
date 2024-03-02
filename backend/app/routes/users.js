const controller = require('../controllers/users.js');

const router = require('express').Router();

const cache = require('../middlewares/cache');
const auth = require('../middlewares/auth');

router.post('/sign-up', controller.createUser);
router.get('/login', controller.login);
router.get('/:username', auth, cache, controller.getUser);
router.get('/', cache, controller.ListUserNames);
router.put('/:username', auth, controller.updateUser);
router.delete('/:username', auth, controller.deleteUser);


module.exports = router; 