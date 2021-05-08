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

const renderBooking=async(req,res)=>
{
    var booking_id = req.params.id;
    const booking = await bookingService.FindBooking(booking_id);
    if (!book) {
        res.status(404).send('Booking Not Found.');
    } else {
        res.status(200).send(booking);
    }
}

const deleteBooking=async(req,res)=>
{
    var booking_id=req.params.id;
    try{
        await bookingService.DeleteBooking(booking_id);
        res.send('Booking Deleted Successfully.')
    }
    catch(err)
    {
        res.send(err);
    }
}

module.exports={
    renderNewBooking,
    newBooking,
    renderBooking,
    deleteBooking
};