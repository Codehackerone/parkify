const bookingService = require('../services/booking.service');

const renderNewBooking = (req, res) => {
    res.send('New Booking');
};

const newBooking=async(req,res)=>{
    try {
        const result = await bookingService.NewBooking(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

module.exports={
    renderNewBooking,
    newBooking
};