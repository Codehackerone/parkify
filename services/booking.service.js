const Booking = require('../models/booking.model');
const Slot=require('../models/slot.model');

const NewBooking = async (bookingBody) => {
    try {
        const result=await Booking.create(bookingBody);
        const slot=await Slot.findById(bookingBody.slot_id)
        slot.bookings.push(result);
        await slot.save();
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports={
    NewBooking
}