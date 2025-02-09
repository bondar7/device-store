const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const authMiddleware = require('../middleware/jwt/authMiddleware');
const {verifyRolesMiddleware} = require('../middleware/jwt/verifyRolesMiddleware');
const {ROLES_LIST} = require('../middleware/jwt/verifyRolesMiddleware');

router.post('/',authMiddleware, verifyRolesMiddleware([ROLES_LIST.Admin]), brandController.create);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);

module.exports = router;