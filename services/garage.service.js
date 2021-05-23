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

const DistanceCal=(lat1,lon1, lat2, lon2)=>
{   
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a=Math.pow(Math.sin(dlat / 2), 2)+ Math.cos(lat1) * Math.cos(lat2)* Math.pow(Math.sin(dlon / 2),2);
  let c=2 * Math.asin(Math.sqrt(a));
  let r=6371;
  return(c * r);
}

module.exports = {
  AddGarage,
  FindGarage,
  AllGarages,
  DeleteGarage,
  ReturnCoords,
  DistanceCal
};
