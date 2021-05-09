const Booking = require('../models/booking.model');
const Slot=require('../models/slot.model');
const User=require('../models/user.model');

const NewBooking = async (bookingBody) => {
    try {
        const slot=await Slot.findById(bookingBody.slot_id);
        if(bookingBody.start_time>=bookingBody.end_time){
            throw "PLease Choose a Correct Start and End Date!";
        }
        const all_bookings=slot.bookings;
        if(all_bookings.length!=0)
        {
            for(var i=0;i<all_bookings.length;i++)
            {
                var booking=await Booking.findById(all_bookings[i]);
                if(!booking)continue;
                var a=parseInt(booking.start_time),b=parseInt(booking.end_time);
                var c=parseInt(bookingBody.start_time),d=parseInt(bookingBody.end_time);
                if((c>=a && c<=b)||(d>=a && d<=b)||(c<=a && d>=b)){
                    throw "Already Booked!";
                }
                else{
                    continue;
                }                
            }
        }
        const user=await User.findById(bookingBody.user_id);
        if(!user) throw "User doesnt Exist";
        if(bookingBody.amount>user.money)throw "Insufficient Funds!!";
        const result=await Booking.create(bookingBody);
        slot.bookings.push(result);
        await slot.save();
        var money=parseFloat(user.money);
        money=money-parseFloat(bookingBody.amount);
        user.money=money;
        await user.save();
        return result;
    } catch (error) {
        throw error;
    }
};

const FindBooking = async (id) => {
    const booking = await Booking.findOne({ _id: id });
    return booking;
};

const DeleteBooking=async(id)=>
{
    try
    {
        const booking=await Booking.findById(id);
        await Slot.findByIdAndUpdate(booking.slot_id, { $pull: { bookings: id } });
        await Booking.findByIdAndDelete(id);
    }
    catch(err)
    {
        throw err;
    }
}

const apiMoney=async(slot_id)=>
{
    try
    {
        var slot=await Slot.findById(slot_id);
        return slot.price;
    }
    catch(err)
    {
        return err;
    }
}

const FindByUser=async(id)=>
{
    try
    {
        var bookings=await Booking.find({user_id:id});
        return bookings;
    }
    catch(err)
    {
        res.send('Error');
    }
}

module.exports={
    NewBooking,
    FindBooking,
    DeleteBooking,
    apiMoney,
    FindByUser
}