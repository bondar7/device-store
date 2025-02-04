const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refreshToken);
router.post('/auth', userController.checkAuth);

module.exports = router;