const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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

    return user;
};
module.exports={
    Register,
    Login
};