const handleRegistrationMiddleware = require('../middleware/user/handleRegistrationMiddleware');
const handleLoginMiddleware = require('../middleware/user/handleLoginMiddleware');
const handleRefreshTokenMiddleware = require('../middleware/jwt/handleRefreshTokenMiddleware');
const handleLogoutMiddleware = require('../middleware/user/handleLogoutMiddleware');
const handleCheckAuthMiddleware = require('../middleware/user/handleCheckAuthMiddleware');
const handleUpdateUserMiddleware = require('../middleware/user/handleUpdateUserMiddleware');

class UserController {
    async register(req, res, next){
        await handleRegistrationMiddleware(req, res, next);
    }
    async login(req, res, next){
        await handleLoginMiddleware(req, res, next);
    }
    async logout(req, res, next) {
        await handleLogoutMiddleware(req, res, next);
    }
    async refreshToken(req, res, next) {
        await handleRefreshTokenMiddleware(req, res, next);
    }
    async checkAuth(req, res, next) {
        await handleCheckAuthMiddleware(req, res, next);
    }
    async updateUser(req, res, next) {
        await handleUpdateUserMiddleware(req, res, next);
    }
}

module.exports =  new UserController();