const Slot = require('../models/slot.model');
const Garage = require('../models/garage.model');
const Booking = require('../models/booking.model');

//AddSlot... receives slot object and creates new slot document in the DB
const AddSlot = async (slotBody) => {
    try {
        const result = await Slot.create(slotBody);
        const garage = await Garage.findById(slotBody.garage_id);
        garage.slots.push(result);
        await garage.save();
        return result;
    } catch (error) {
        throw error;
    }
};

//FindSlot... receives slot id and returns slot document
const FindSlot = async (id) => {
    try {
        const slot = await Slot.findOne({ _id: id });
        return slot;
    } catch (err) {
        return null;
    }
};

//DeleteSlot.. receives slot id and deletes slot document from the DB
const DeleteSlot = async (id) => {
    try {
        const slot = await Slot.findById(id);
        if (!slot) throw 'Slot Not FOund!';
        for (let booking_id of slot.bookings) {
            await Booking.findByIdAndDelete(booking_id);
        }
        await Garage.findByIdAndUpdate(slot.garage_id, {
            $pull: { slots: id },
        });
        await Slot.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    AddSlot,
    FindSlot,
    DeleteSlot,
};
