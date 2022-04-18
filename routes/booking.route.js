/* ------------ Imports  ----------- */

const express = require('express');
const Router = express.Router();
const bookingController = require('../controllers/booking.controller');
const IsLoggedInMiddleware = require('../middleware/login.middleware');
const sanitizerMiddleware = require('../middleware/sanitizer.middleware');

/* ------------ Endpoint Definitions ----------- */

Router.route('/new/:id')
    .get(IsLoggedInMiddleware(), bookingController.renderNewBooking)
    .post(IsLoggedInMiddleware(), bookingController.newBooking);

Router.route('/:id')
    .get(IsLoggedInMiddleware(), bookingController.renderBooking)
    .delete(IsLoggedInMiddleware(), bookingController.deleteBooking);

Router.route('/cancel/:id').post(
    IsLoggedInMiddleware(),
    bookingController.cancelBooking
);

module.exports = Router;
