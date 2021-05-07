const Slot = require('../models/slot.model');

const AddSlot = async (slotBody) => {
    try {
        return await Slot.create(slotBody);
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