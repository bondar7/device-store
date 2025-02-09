const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.get('/:userId', basketController.getUserBasket);

module.exports = router;