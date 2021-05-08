const Garage = require('../models/garage.model');

const AddGarage = async (garageBody) => {
    try {
        return await Garage.create(garageBody);
    } catch (error) {
        throw error;
    }
};

const FindGarage = async (id) => {
    try{
        const garage = await Garage.findOne({ _id: id });
        return garage;
        }
        catch(err)
        {
            const garage=null;
            return garage;
        }    
};

const AllGarages=async()=>{
    return await Garage.find({});
}
module.exports={
    AddGarage,
    FindGarage,
    AllGarages
};