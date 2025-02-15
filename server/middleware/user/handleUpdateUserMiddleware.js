const User = require("../../model/User");
const Review = require("../../model/Review");
const ApiError =  require("../../error/ApiError");
const bcrypt = require("bcrypt");
const JWT = require("../../utils/jwt/JWT");

module.exports = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const user = req.user;
        if (!username) return next(ApiError.badRequest("Username cannot be empty"));
        if (!email) return next(ApiError.badRequest("Email cannot be empty"));
        const foundUser = await User.findOne({where: {id: user.id}});
        if (!foundUser) return next(ApiError.internal("Something went wrong. Try again later."));
        const existingEmailUser = await User.findOne({where: {email}});
        if (existingEmailUser && existingEmailUser.id !== user.id) return next(ApiError.badRequest("Email is already used"));
        if (!isValidEmail(email)) return next(ApiError.badRequest("Email is not valid"));
        const existingUsernameUser = await User.findOne({where: {username}});
        if (existingUsernameUser && existingUsernameUser.id !== user.id) return next(ApiError.badRequest("Username is already taken"));

        const emailNotChanged = email === user.email;
        const usernameNotChanged = username === user.username;
        const passwordNotChanged = password !== "" ? await bcrypt.compare(password, foundUser.password) : true;

        const hashedPassword = password !== "" ? await bcrypt.hash(password, 10) : foundUser.password;

        if (!emailNotChanged || !usernameNotChanged || !passwordNotChanged) {
            if (password !== "" && !isValidPwd(password)) return next(ApiError.badRequest("Password is too short"));
            const updatedUser = await User.update(
                {
                    username: username,
                    email: email,
                    password: hashedPassword,
                },
                {
                    where: {id: user.id},
                    returning: true,
                    plain: true
                }
            );
            // update username in all reviews written by this user if username has changed
            if (!usernameNotChanged) {
                await Review.update(
                    {
                        username: username,
                    },
                    {
                        where: {userId: user.id}
                    }
                )
            }
            const newAccessToken = JWT.signAccessToken(user.id, username, email, user.roles);
            return res.json({token: newAccessToken});
        }
    } catch (e) {
        console.log(e);
        next(ApiError.internal("Something went wrong. Try again later."));
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPwd(pwd) {
    return pwd.length >= 8;
}