const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/jwt/authMiddleware");

router.get('/', authMiddleware, basketController.getUserBasket);
router.post('/add', authMiddleware, basketController.addToBasket);
router.delete('/delete/:deviceId', authMiddleware, basketController.deleteFromBasket);
router.post('/updateQuantity', authMiddleware, basketController.updateQuantity);

module.exports = router;