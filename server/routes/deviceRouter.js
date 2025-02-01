const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/jwt/authMiddleware');
const {verifyRolesMiddleware} = require('../middleware/jwt/verifyRolesMiddleware');
const {ROLES_LIST} = require('../middleware/jwt/verifyRolesMiddleware');

router.post('/', authMiddleware, verifyRolesMiddleware(ROLES_LIST.Admin), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getById);

module.exports = router;