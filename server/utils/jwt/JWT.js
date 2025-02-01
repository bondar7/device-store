const jwt = require("jsonwebtoken");

class JWT {
    static signAccessToken(id, email, roles) {
        return jwt.sign(
            {
                id: id,
                email: email,
                roles: roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1m'}
        );
    }
    static signRefreshToken(email) {
        return jwt.sign(
            {
                email: email
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
    }
}

module.exports = JWT;