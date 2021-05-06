const User = require('../models/user.model');

const Register = async (userBody) => {
    try {
        return await User.create(userBody);
    } catch (error) {
        throw error;
    }
};

module.exports={
    Register
};