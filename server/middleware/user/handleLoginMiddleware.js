const ApiError = require("../../error/ApiError");
const User = require("../../model/User");
const RefreshToken = require("../../model/RefreshToken");
const JWT = require("../../utils/jwt/JWT");
const bcrypt = require("bcrypt");
const uuid = require('uuid');

module.exports = async (req, res, next) => {
    {
        try {
            const {email, password} = req.body;
            if (!email || !password) return next(ApiError.badRequest('Email and Password are required!'));
            const user = await User.findOne({where: {email}});
            if (!user) return next(ApiError.badRequest('User does not exist!'));
            if (!(await isCorrectPwd(password, user.password))) return next(ApiError.badRequest('Incorrect password!'));
            //create jwt tokens
            const accessToken = JWT.signAccessToken(user.id, user.email, user.roles);
            const refreshToken = JWT.signRefreshToken(user.email);
            //save refresh token in DB
            await RefreshToken.create({
                userId: user.id,
                deviceId: uuid.v4(),
                token: refreshToken
            })
            res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', partitioned: true, secure: true});
            res.json({token: accessToken});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

async function isCorrectPwd(pwd, correctPwd) {
    return await bcrypt.compare(pwd, correctPwd);
}