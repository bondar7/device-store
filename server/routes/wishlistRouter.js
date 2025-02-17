const Router = require('express');
const router = Router();
const authMiddleware = require('../middleware/jwt/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

router.get('/', authMiddleware, wishlistController.getUserWishlist);
router.post('/add', authMiddleware, wishlistController.add);
router.delete('/delete/:deviceId', authMiddleware, wishlistController.delete);