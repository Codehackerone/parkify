const Garage = require('../models/garage.model');

const AddGarage = async (garageBody) => {
    try {
        return await Garage.create(garageBody);
    } catch (error) {
        throw error;
    }
};

module.exports={
    AddGarage
};