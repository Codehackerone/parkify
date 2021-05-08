const express = require('express');
const Router = express.Router();
const bookingController = require('../controllers/booking.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware');
const sanitizerMiddleware=require('../middleware/sanitizer.middleware');

Router.route('/new')
    .get(IsLoggedInMiddleware(),bookingController.renderNewBooking)
    .post(bookingController.newBooking);
    
Router.route('/:id')
    .get(bookingController.renderBooking)
    .delete(bookingController.deleteBooking)

module.exports=Router;