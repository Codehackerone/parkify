const bookingService = require('../services/booking.service');
const slotService = require('../services/slot.service');
const garageService = require('../services/garage.service');

/* ------------ Controllers ----------- */

//renderNewBooking... renders the new booking page
const renderNewBooking = async (req, res) => {
    var slot_id = req.params.id;
    var slot = await slotService.FindSlot(slot_id);
    if (slot === null) {
        req.flash('err', 'Slot doesnt exist');
        res.redirect('/garage');
    } else {
        var garage = await garageService.FindGarage(slot.garage_id);
        if (!garage) {
            req.flash('err', 'Garage doesnt exist for the slot.');
            res.redirect('/garage');
        } else {
            res.render('bookings/newbooking', {
                userid: req.body.user_id,
                slot: slot,
                body: req.body,
                garage: garage,
            });
        }
    }
};

//newBooking... creates a new booking calculating the price, and redirects to the dashboard
const newBooking = async (req, res) => {
    req.body.start_time = new Date(req.body.start_datetime).getTime() / 1000;
    req.body.end_time = new Date(req.body.end_datetime).getTime() / 1000;
    req.body.amount =
        (await bookingService.apiMoney(req.body.slot_id)) *
        ((req.body.end_time - req.body.start_time) / 60);
    try {
        const result = await bookingService.NewBooking(req.body);
        req.flash('success', 'Booking Created Successfully');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err', err);
        res.redirect('/booking/new/' + req.body.slot_id);
    }
};

//renderBooking... renders the booking page
const renderBooking = async (req, res) => {
    var booking_id = req.params.id;
    const booking = await bookingService.FindBooking(booking_id);
    if (!booking) {
        req.flash('err', 'Booking Not Found');
        res.redirect('/users/dashboard');
    } else {
        res.send(booking);
    }
};

//deleteBooking... deletes a booking and redirects to the dashboard
const deleteBooking = async (req, res) => {
    var booking_id = req.params.id;
    try {
        await bookingService.DeleteBooking(booking_id);
        req.flash('success', 'Booking Deleted Successfully');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err', 'Error :' + err);
        res.redirect('/users/dashboard');
    }
};

//cancelBooking... cancels a booking and redirects to the dashboard
const cancelBooking = async (req, res) => {
    var id = req.params.id;
    try {
        await bookingService.cancelBooking(id);
        req.flash('success', 'Booking cancelled successfully');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err', err);
        res.redirect('/users/dashboard');
    }
};

module.exports = {
    renderNewBooking,
    newBooking,
    renderBooking,
    deleteBooking,
    cancelBooking,
};
