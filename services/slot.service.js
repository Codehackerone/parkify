const Slot = require('../models/slot.model');
const Garage=require('../models/garage.model');
const Booking=require('../models/booking.model');

const AddSlot = async (slotBody) => {
    try {
        const result=await Slot.create(slotBody);
        const garage=await Garage.findById(slotBody.garage_id)
        garage.slots.push(result);
        await garage.save();
        return result;
    } catch (error) {
        throw error;
    }
};


const FindSlot = async (id) => {
    try{
    const slot = await Slot.findOne({ _id: id });
    return slot;
    }
    catch(err)
    {
        const slot=null;
        return slot;
    }    
};

const DeleteSlot=async(id)=>
{
    try
    {
        const slot=await Slot.findById(id);
        if(!slot)throw "Slot Not FOund!";
        for(let booking_id of slot.bookings)
        {
            await Booking.findByIdAndDelete(booking_id);
        }
        await Garage.findByIdAndUpdate(slot.garage_id, { $pull: { slots: id } });
        await Slot.findByIdAndDelete(id);
    }
    catch(err)
    {
        throw err;
    }
}


module.exports={
    AddSlot,
    FindSlot,
    DeleteSlot
};