const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const helper=require('../utils/helper');

const expiry_length = parseInt(process.env.EXPIRY) * 86400;
const jwt_headers = {
    algorithm: 'HS256',
    expiresIn: expiry_length,
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

const Register = async (userBody) => {
    try {
        return await User.create(userBody);
    } catch (error) {
        throw error;
    }
};

const generateOtp=async(username)=>
{
    var otp=helper.getRandomOtp(6);
    const user = await User.findOne({ username });
    if (!user) throw 'User doesnt exist';
    await sendmail(user.email,'OTP',otp);
    return {
        otp:otp,
        user:user
    };
}

const Login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) throw 'Invalid Username or Password';

    if (!(await bcrypt.compare(password, user.password)))
        throw 'Invalid Username or Password';

    const accessToken = jwt.sign(
        { username: user.username, user_id: user._id },
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
    Login,
    generateOtp
};