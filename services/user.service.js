const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const expiry_length = parseInt(process.env.EXPIRY) * 86400;
const jwt_headers = {
    algorithm: 'HS256',
    expiresIn: expiry_length,
};

const Register = async (userBody) => {
    try {
        return await User.create(userBody);
    } catch (error) {
        throw error;
    }
};

const Login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) throw 'Invalid Username or Password';

    if (!(await bcrypt.compare(password, user.password)))
        throw 'Invalid Username or Password';

    const accessToken = jwt.sign(
        { email: user.username, user_id: user._id },
        process.env.JWT_SECRET,
        jwt_headers
    );

    return {
        token: accessToken,
        user: user,
    };
};
module.exports={
    Register,
    Login
};