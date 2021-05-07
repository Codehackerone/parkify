const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

let options = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 60 * Number(process.env.EXPIRY), 
    httpOnly: true, 
};

let options_otp = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 5, 
    httpOnly: true, 
};
const renderRegister = (req, res) => {
    res.render('users/register');
};
const renderLogin = (req, res) => {
    res.render('users/login');
};
const renderDashboard=(req,res)=>
{
    res.render('users/dashboard');
}
const renderVerify=async(req,res)=>
{
    if(req.body.verified===true)
    {
        res.send('Already Verified');
    }
    else
    {
        var result=await sendOtp(req.body.username);
        res.cookie('otp', result.token, options_otp);
        res.render('users/verify',{email:req.body.email});
    }
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

const sendOtp=async(username)=>
{
    try{
        var gen_otp=await userService.generateOtp(username);
        return gen_otp;
    }
    catch(err)
    {
        return(err);
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

const logout = (req, res) => {
    res.clearCookie('isloggedin');
    res.status(200).send('Logged Out');
};

const verify=async(req,res)=>
{
    var otp=req.body.otp;
    let token = req.cookies['otp'];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
        return res.json('Expired or Invalid login token');
    else
    {
        if(decoded.otp===otp){
            await userService.verified(req.body.username);
            res.clearCookie('otp');
            res.send('Verified')
        }
        else
        {
            res.send('reenter otp');
        }
    }
}


module.exports={
renderLogin,
renderRegister,
register,
login,
renderDashboard,
logout,
renderVerify,
verify
};