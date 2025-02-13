const Router = require("express");
const router = new Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/jwt/authMiddleware");

router.post('/', authMiddleware, reviewController.create);
router.delete('/:id', authMiddleware, reviewController.delete);
router.get('/', reviewController.getAll);
router.put('/:reviewId', reviewController.updateReview);

module.exports = router;