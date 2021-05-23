const Garage = require("../models/garage.model");
const Slot = require("../models/slot.model");
const Booking = require("../models/booking.model");
const AddGarage = async (garageBody) => {
  try {
    return await Garage.create(garageBody);
  } catch (error) {
    throw error;
  }
};

const FindGarage = async (id) => {
  try {
    const garage = await Garage.findById(id);
    return garage;
  } catch (err) {
    const garage = null;
    return garage;
  }
};

const AllGarages = async () => {
  return await Garage.find({});
};

const DeleteGarage = async (id) => {
  var garage = await FindGarage(id);
  if (!garage) throw "Garage not found";
  for (let slot_id of garage.slots) {
    var slot = await Slot.findById(slot_id);
    for (let booking_id of slot.bookings) {
      await Booking.findByIdAndDelete(booking_id);
    }
    await Slot.findByIdAndDelete(slot_id);
  }
  await Garage.findByIdAndDelete(id);
};

const ReturnCoords=async()=>
{
  const garages=await AllGarages();
  var coords=[];
  for(let garage of garages)
  {
    coords.push(garage.geometry);
  }
  return coords;
}


module.exports = {
  AddGarage,
  FindGarage,
  AllGarages,
  DeleteGarage,
  ReturnCoords
};
