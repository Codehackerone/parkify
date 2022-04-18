/* ------------ Imports  ----------- */
const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const userController = require('../controllers/user.controller');
const IsLoggedInMiddleware = require('../middleware/login.middleware');
const sanitizerMiddleware = require('../middleware/sanitizer.middleware');

/* ------------ Endpoint Definitions ----------- */

Router.route('/register')
    .get(userController.renderRegister)
    .post(sanitizerMiddleware(), userController.register);

Router.route('/login')
    .get(userController.renderLogin)
    .post(sanitizerMiddleware(), userController.login);

Router.route('/verify')
    .get(IsLoggedInMiddleware(), userController.renderVerify)
    .post(IsLoggedInMiddleware(), userController.verify);

Router.route('/dashboard').get(
    IsLoggedInMiddleware(),
    userController.renderDashboard
);

Router.route('/changeimage')
    .get(IsLoggedInMiddleware(), userController.renderImage)
    .post(
        upload.single('image'),
        IsLoggedInMiddleware(),
        userController.uploadImage
    );

Router.route('/addmoney')
    .get(IsLoggedInMiddleware(), userController.renderAddMoney)
    .post(IsLoggedInMiddleware(), userController.addMoney);

Router.route('/apiotp/:value').get(userController.apiOtp);

Router.route('/resendotp').post(
    IsLoggedInMiddleware(),
    userController.resendOTP
);

Router.route('/logout').delete(IsLoggedInMiddleware(), userController.logout);

Router.route('/transactions').get(
    IsLoggedInMiddleware(),
    userController.renderTransactions
);

Router.route('/bookings').get(
    IsLoggedInMiddleware(),
    userController.renderBookings
);

Router.route('/booking/:id').get(
    IsLoggedInMiddleware(),
    userController.renderBooking
);

module.exports = Router;
