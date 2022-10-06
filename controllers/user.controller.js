const userService = require('../services/user.service');
const bookingService = require('../services/booking.service');
const garageService = require('../services/garage.service');
const slotService = require('../services/slot.service');
const jwt = require('jsonwebtoken');

/* ------------ Configs ----------- */

// cookie options
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

/* ------------ Controllers ----------- */

//renderRegister... renders the register page
const renderRegister = (req, res) => {
    res.render('users/register');
};

//renderLogin... renders the login page
const renderLogin = (req, res) => {
    res.render('users/login');
};

//renderDashboard... renders the dashboard page
const renderDashboard = async (req, res) => {
    var bookings = await bookingService.FindByUser(req.body.user_id);
    for (let booking of bookings) {
        if (
            booking.status !== 'Completed' &&
            booking.end_time <= new Date().getTime() / 1000
        ) {
            await bookingService.completeBooking(booking._id);
        }
    }
    var bookings = await bookingService.FindByUser(req.body.user_id);
    res.render('users/dashboard', { body: req.body, bookings: bookings });
};

//renderAddMoney... renders the add money page
const renderAddMoney = (req, res) => {
    res.render('users/addmoney', { money: req.body.money, body: req.body });
};

//renderVerify... renders the otp verify page
const renderVerify = async (req, res) => {
    if (req.body.verified === true) {
        res.send('Already Verified');
    } else {
        var result = await sendOtp(req.body.username);
        res.cookie('otp', result.token, options_otp);
        res.render('users/verify', { email: req.body.email });
    }
};

//renderRegister... renders the register page
const register = async (req, res) => {
    try {
        const result = await userService.Register(req.body);
        res.cookie('isloggedin', result.token, options);
        req.flash(
            'alert',
            'Registered Successfully. Please Verify your Email.'
        );
        res.redirect('/users/verify');
    } catch (err) {
        req.flash('err', 'Error :' + err);
        res.redirect('/users/register');
    }
};

//sendOtp... sends otp to the user
const sendOtp = async (username) => {
    try {
        var gen_otp = await userService.generateOtp(username);
        return gen_otp;
    } catch (err) {
        return err;
    }
};

// login... logs in the user
const login = async (req, res) => {
    try {
        const result = await userService.Login(
            req.body.username,
            req.body.password
        );
        res.cookie('isloggedin', result.token, options);
        req.flash('success', 'Logged in Successfully.');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err', 'Error :' + err);
        res.redirect('/users/login');
    }
};

// logout... logs out the user
const logout = (req, res) => {
    res.clearCookie('isloggedin');
    req.flash('success', 'Logged out Successfully.');
    res.redirect('/');
};

//verify.. verifies the otp and logs in the user
const verify = async (req, res) => {
    var otp = req.body.otp;
    let token = req.cookies['otp'];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.json('Expired or Invalid login token');
    else {
        if (decoded.otp === otp) {
            await userService.verified(req.body.username);
            res.clearCookie('otp');
            req.flash('success', 'Verification Complete. Welcome Aboard.');
            res.redirect('/users/dashboard');
        } else {
            res.send('reenter otp');
        }
    }
};

//renderImageChange... renders the upload image page
const renderImage = (req, res) => {
    res.render('users/uploadimage', { body: req.body });
};

//upload Image... uploads the image
const uploadImage = async (req, res) => {
    var path = req.file['path'];
    var userid = req.body.user_id;
    console.log(path + ' ' + userid);
    try {
        await userService.updateImage(userid, path);
        req.flash('success', 'Image Uploaded Successfully');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err', 'Error :' + err);
        res.redirect('/users/changeimage');
    }
};

//addMoney... adds money to the user
const addMoney = async (req, res) => {
    var add_money = req.body.added_money;
    try {
        await userService.addMoney(req.body.user_id, add_money);
        req.flash('success', 'Money Added Successfully');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err', 'Error :' + err);
        res.redirect('/users/addmoney');
    }
};

//apiOtp... compares the given otp with the otp stored in cookie
const apiOtp = (req, res) => {
    var str = req.params.value;
    let token = req.cookies['otp'];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.otp === str) res.send('1');
    else res.send('0');
};

//resendOtp... resends the otp to the user
const resendOTP = (req, res) => {
    req.flash('alert', 'Your OTP has been resent successfully to your email.');
    res.redirect('/users/verify');
};

//renderTransactions... renders the transactions page
const renderTransactions = async (req, res) => {
    var transactions = await userService.getTransactions(req.body.user_id);
    res.render('users/transactions', {
        body: req.body,
        transactions: transactions,
    });
};

//renderBookings... renders the booking page
const renderBookings = async (req, res) => {
    var bookings = await bookingService.FindByUser(req.body.user_id);
    for (let booking of bookings) {
        if (
            booking.status !== 'Completed' &&
            booking.end_time <= new Date().getTime() / 1000
        ) {
            await bookingService.completeBooking(booking._id);
        }
    }
    res.render('users/bookings', { body: req.body, bookings: bookings });
};

//renderBooking... renders the booking details page
const renderBooking = async (req, res) => {
    var id = req.params.id;
    var booking = await bookingService.FindBooking(id);
    if (!booking) {
        req.flash('err', 'No Booking Found');
        res.redirect('/users/dashboard');
    } else {
        var slot = await slotService.FindSlot(booking.slot_id);
        var garage = await garageService.FindGarage(slot.garage_id);
        res.render('users/mybooking', {
            body: req.body,
            booking: booking,
            slot: slot,
            garage: garage,
        });
    }
};
module.exports = {
    renderLogin,
    renderRegister,
    register,
    login,
    renderDashboard,
    logout,
    renderVerify,
    verify,
    renderImage,
    uploadImage,
    renderAddMoney,
    addMoney,
    apiOtp,
    resendOTP,
    renderTransactions,
    renderBookings,
    renderBooking,
};
