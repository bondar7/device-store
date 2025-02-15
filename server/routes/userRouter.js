const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/jwt/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refreshToken);
router.post('/auth', userController.checkAuth);
router.put('/update', authMiddleware, userController.updateUser);

module.exports = router;