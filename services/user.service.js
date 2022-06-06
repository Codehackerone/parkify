const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const helper = require('../utils/helper');
const Transaction = require('../models/transaction.model');
const axios = require('axios');

/* ------------ JWT Configs ----------- */

const expiry_length = parseInt(process.env.EXPIRY) * 86400;
const jwt_headers = {
    algorithm: 'HS256',
    expiresIn: expiry_length,
};

/* ------------ Services ----------- */

//sendmail... sends email to the user using nodemailer
async function sendmail(to, subject, otp) {
    const options = {
        method: 'POST',
        url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST,
            'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        },
        data: `{"personalizations":[{"to":[{"email":"${to}"}],"subject":"${subject}"}],"from":{"email":"no-reply@parkify-web.herokuapp.com"},"content":[{"type":"text/plain","value":"Your otp is : ${otp}"}]}`,
    };
    axios
        .request(options)
        .then(function (response) {
            console.log('Email sent: ' + response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Register... receives user object and creates new user document in the DB
const Register = async (userBody) => {
    try {
        const user = await User.create(userBody);
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

//GenerateOtp... generates otp, encodes it by jwt and sends it to the user's email
const generateOtp = async (username) => {
    var otp = helper.getRandomOtp(6);
    const user = await User.findOne({ username });
    if (!user) throw 'User doesnt exist';
    await sendmail(user.email, 'OTP', otp);
    const accessToken = jwt.sign(
        { username: user.username, otp: otp },
        process.env.JWT_SECRET,
        jwt_headers
    );
    return {
        token: accessToken,
        otp: otp,
        user: user,
    };
};

// Login... receives email, password and validates the user login
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

//verified... sets the verified field to true
const verified = async (username) => {
    const user = await User.findOne({ username });
    if (!user) throw 'User Doesnt Exist';
    user.verified = true;
    await user.save();
};

//updateImage... updates the user's profile picture
const updateImage = async (userid, path) => {
    try {
        await User.findOneAndUpdate({ _id: userid }, { picture_url: path });
    } catch (err) {
        throw err;
    }
};

//addMoney... adds money to the user's wallet
const addMoney = async (user_id, added_money) => {
    const user = await User.findById(user_id);
    if (!user) throw 'User Doesnt Exist';
    else {
        var money = parseFloat(user.money);
        money += parseFloat(added_money);
        user.money = money;
        const transaction = {
            user_id: user._id,
            type: 'credit',
            amount: parseFloat(added_money),
            remarks: 'add_fund',
        };
        await Transaction.create(transaction);
        await user.save();
    }
};

//getTransactions... returns the user's transactions
const getTransactions = async (id) => {
    var transactions = await Transaction.find({ user_id: id });
    return transactions;
};

module.exports = {
    Register,
    Login,
    generateOtp,
    verified,
    updateImage,
    addMoney,
    getTransactions,
};
