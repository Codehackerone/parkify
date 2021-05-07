const Slot = require('../models/slot.model');
const Garage=require('../models/garage.model');

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

module.exports={
    AddSlot,
    FindSlot
};