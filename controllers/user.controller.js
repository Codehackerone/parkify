const userService = require('../services/user.service');

let options = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 60 * Number(process.env.EXPIRY), 
    httpOnly: true, 
};


const renderRegister = (req, res) => {
    res.render('register');
};
const renderLogin = (req, res) => {
    res.render('login');
};
const renderDashboard=(req,res)=>
{
    res.send('Dashboard');
}
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
        res.cookie('isloggedin', result.token, options);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
};

module.exports={
renderLogin,
renderRegister,
register,
login,
renderDashboard
};