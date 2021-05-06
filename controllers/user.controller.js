//const userService = require('../services/user.service');

const renderRegister = (req, res) => {
    res.render('register');
};

const renderLogin = (req, res) => {
    res.render('login');
};

module.exports={
renderLogin,
renderRegister
};