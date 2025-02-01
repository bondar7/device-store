const ApiError = require('../../error/ApiError');

const verifyRolesMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles;
        if (!userRoles) return next(ApiError.forbidden("No roles provided"));
        const isAllowed = userRoles.map(role => {
            if (role) return allowedRoles.includes(role);
        }).find(value => value === true);
        if (!isAllowed) return next(ApiError.forbidden('You have no access'));
        next();
    }
}

const ROLES_LIST = {
    'Admin': 'ADMIN',
    'User': 'USER'
}

module.exports = {verifyRolesMiddleware, ROLES_LIST};