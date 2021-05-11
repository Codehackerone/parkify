const slotService = require('../services/slot.service');
const garageService=require('../services/garage.service');
const bookingService=require('../services/booking.service');

const renderAddSlot = (req, res) => {
    var garage_id=req.params.id;
    res.render('slots/addslot',{garage_id:garage_id,body: req.body});
};

const addSlot=async (req,res)=>
{
    try {
        const result = await slotService.AddSlot(req.body);
        req.flash('success','Slot Added Successfully');
        res.redirect('/garage/'+result.garage_id);
    } catch (err) {
        req.flash('err','Error :'+err);
        res.redirect('/garage/'+req.body.garage_id);
    }
}

const renderSlot = async (req, res) => {
    var slot_id = req.params.id;
    const slot = await slotService.FindSlot(slot_id);
    if (!slot) {
        req.flash('err','Slot Not Found');
        res.redirect('/garage/');
    } else {
        var bookings=await findBookings(slot._id);
        res.render('slots/slot',{slot:slot,bookings:bookings,body: req.body});
    }
};


const deleteSlot=async(req,res)=>
{
    var slot_id=req.params.id;
    try{
        await slotService.DeleteSlot(slot_id);
        res.send('Slot Deleted Successfully.')
    }
    catch(err)
    {
        req.flash('err','Error :'+err);
        res.redirect('/garage/');
    }
}

const renderSlots=async(req,res)=>
{
    var garage_id=req.params.id;
    var garage=await garageService.FindGarage(garage_id);
    if(!garage)
    {
        req.flash('err','Garage Not Found!');
        res.redirect('/garage/');
    }
    var slots=garage.slots;
    var arr_slot=[]
    for(var slot of slots)
    {
        var slot_det=await slotService.FindSlot(slot);
        arr_slot.push(slot_det);
    }
    res.render('slots/allslots',{garage:garage,slots:arr_slot,body: req.body});
}

const findBookings=async(id)=>
{
    var slot=await slotService.FindSlot(id);
    if(!slot)return "Slot Not Found";
    var bookings=slot.bookings;
    var arr_booking=[]
    for(var booking of bookings)
    {
        var booking_det=await bookingService.FindBooking(booking);
        arr_booking.push(booking_det);
    }
    return arr_booking;
}

const apiBooking=async(req,res)=>
{
    var slot_id=req.params.id;
    var arr_booking=await findBookings(slot_id);
    res.send(arr_booking);
}
module.exports={
    renderAddSlot,
    addSlot,
    renderSlot,
    deleteSlot,
    renderSlots,
    apiBooking,
    findBookings
};