const ApiError = require("../../error/ApiError");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const uuid = require('uuid');
const Basket = require("../../model/Basket");
const RefreshToken = require("../../model/RefreshToken");
const JWT = require('../../utils/jwt/JWT');

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return next(ApiError.badRequest('Email and Password are required!'));
        if (!isValidEmail(email)) return next(ApiError.badRequest('Email is not valid!'));
        if (!isValidPwd(password)) return next(ApiError.badRequest('Password must have at least 8 characters!'));
        const user = await User.findOne({where: {email}});
        if (user) return next(ApiError.badRequest('User already exist!'));
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            email: email,
            password: hashedPassword
        });
        await Basket.create({userId: createdUser.id});
        //create jwt tokens
        const accessToken = JWT.signAccessToken(createdUser.id, createdUser.email, createdUser.roles);
        const refreshToken = JWT.signRefreshToken(createdUser.email);
        //save refresh token in DB
        await RefreshToken.create({
            userId: createdUser.id,
            deviceId: uuid.v4(),
            token: refreshToken
        })
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', partitioned: true, secure: true});
        res.json({token: accessToken});
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPwd(pwd) {
    return pwd.length >= 8;
}