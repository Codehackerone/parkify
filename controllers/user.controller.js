const userService = require('../services/user.service');
const getRandomOtp=require('../utils/otpgen');
const nodemailer = require("nodemailer");

let options = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 60 * Number(process.env.EXPIRY), 
    httpOnly: true, 
};

async function sendmail(to,subject, otp) {
    var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    });
    var mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: `Your otp is :${otp}`,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
    });
}

const renderRegister = (req, res) => {
    res.render('users/register');
};
const renderLogin = (req, res) => {
    //sendmail('soumyajitdatta123@gmail.com','OTP','6R381')
    res.render('users/login');
};
const renderDashboard=(req,res)=>
{
    res.render('users/dashboard');
}
const renderVerify=(req,res)=>
{
    res.render('users/verify');
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

const logout = (req, res) => {
    res.clearCookie('isloggedin');
    res.status(200).send('Logged Out');
};

const verify=async(req,res)=>
{

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