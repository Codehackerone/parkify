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
        const user= await User.create(userBody);
        const accessToken = jwt.sign(
            { username: user.username, user_id: user._id },
            process.env.JWT_SECRET,
            jwt_headers
        );
        return {
            token: accessToken,
            user: user,
        };
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
    const accessToken = jwt.sign(
        { username: user.username, otp:otp},
        process.env.JWT_SECRET,
        jwt_headers
    );
    return {
        token: accessToken,
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

const verified=async(username)=>{
    const user = await User.findOne({ username });
    if (!user) throw 'User Doesnt Exist';
    user.verified=true;
    await user.save();
}


const updateImage = async (userid, path) => {
    try {
        await User.findOneAndUpdate({ _id: userid }, { picture_url: path });
    } catch (err) {
        throw err;
    }
};

const addMoney=async(user_id,added_money)=>
{   
    const user = await User.findById(user_id);
    if (!user) throw 'User Doesnt Exist';
    else{
        user.money+=added_money;
        await user.save();
    }
}
module.exports={
    Register,
    Login,
    generateOtp,
    verified,
    updateImage,
    addMoney
};