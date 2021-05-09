const bookingService = require('../services/booking.service');

const renderNewBooking = (req, res) => {
    var slot_id=req.params.id;
    res.render('bookings/newbooking',{userid:req.body.user_id,slot_id:slot_id});
};

const newBooking=async(req,res)=>{
    req.body.start_time=(new Date(req.body.start_datetime).getTime())/1000;
    req.body.end_time=(new Date(req.body.end_datetime).getTime())/1000;
    req.body.amount=(await bookingService.apiMoney(req.body.slot_id))*((req.body.end_time-req.body.start_time)/60);
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
    if (!booking) {
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