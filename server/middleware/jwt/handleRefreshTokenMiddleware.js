const ApiError = require('../../error/ApiError');
const RefreshToken = require('../../model/RefreshToken');
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const JWT = require('../../utils/jwt/JWT');

module.exports = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return next(ApiError.badRequest('Cookies are required'));
        const refreshToken = cookies.jwt;
        const foundToken = await RefreshToken.findOne({where: {token: refreshToken}});
        if (!foundToken) return next(ApiError.unauthorized("Invalid refresh token"));
        const user = await User.findOne({where: {id: foundToken.userId}});
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    // If the token is expired or invalid, delete it from the database
                    await RefreshToken.destroy({ where: { token: refreshToken } });
                    return next(ApiError.unauthorized("Refresh token has expired or is invalid"));
                }
                const newAccessToken = JWT.signAccessToken(user.id, user.username, user.email, user.roles);
                const newRefreshToken = JWT.signRefreshToken(user.email);

                //delete the old token
                await RefreshToken.destroy({ where: { token: refreshToken } });
                //create the new token
                await RefreshToken.create({
                    userId: user.id,
                    deviceId: foundToken.deviceId,
                    token: newRefreshToken
                });
                //send new tokens
                res.cookie('jwt', newRefreshToken, {httpOnly: true, sameSite: 'None', partitioned: true, secure: true});
                res.json({token: newAccessToken});
            }
        )
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}