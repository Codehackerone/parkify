const userService = require('../services/user.service');

const renderRegister = (req, res) => {
    res.render('register');
};

const register=async (req,res)=>
{
    try {
        const result = await userService.Register(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

const login = async (req, res) => {
    try {
        const result = await userService.Login(
            req.body.username,
            req.body.password
        );
        res.send(result);
    } catch (err) {
        res.send(err);
    }
};
const renderLogin = (req, res) => {
    res.render('login');
};

module.exports={
renderLogin,
renderRegister,
register,
login
};