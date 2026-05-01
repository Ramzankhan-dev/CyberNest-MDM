const jwt = require("jsonwebtoken");

const generateToken = (owner) => {

    return jwt.sign(
        {
            id: owner.id,
            email: owner.email,
            role: "owner"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

};

module.exports = generateToken;