const ApiError = require("../../error/ApiError");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer")) return next(ApiError.unauthorized("No authorization token provided"));
    const token = authHeader.split(' ')[1];
    if (!token) return next(ApiError.unauthorized("No authorization token provided"));
    //user has provided token - verify it
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') return next(ApiError.forbidden("Access token is expired"))
            else if (err) return next(ApiError.unauthorized("Invalid token"));
            res.sendStatus(200);
        }
    );

}