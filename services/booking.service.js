const Booking = require('../models/booking.model');

const NewBooking = async (bookingBody) => {
    try {
        const result=await Booking.create(bookingBody);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports={
    NewBooking
}