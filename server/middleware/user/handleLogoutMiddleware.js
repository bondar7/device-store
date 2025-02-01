const ApiError = require('../../error/ApiError');
const RefreshToken = require('../../model/RefreshToken');

module.exports = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(200).json({message: 'You are already logged out'})

        const refreshToken = cookies.jwt;
        const foundToken = await RefreshToken.findOne({where: {token: refreshToken}});
        if (!foundToken) return res.status(200).json({ message: 'Token already invalid or expired' });

        await RefreshToken.destroy({where: {token: refreshToken}});
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', partitioned: true, secure: true });
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}