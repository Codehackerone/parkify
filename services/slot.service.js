const Slot = require('../models/slot.model');

const AddSlot = async (slotBody) => {
    try {
        return await Slot.create(slotBody);
    } catch (error) {
        throw error;
    }
};


module.exports={
    AddSlot
};