const garageService = require('../services/garage.service');

const renderAddGarage = (req, res) => {
    res.send('Add Garage');
};

const addGarage=async (req,res)=>
{
    try {
        const result = await garageService.AddGarage(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}


module.exports={
renderAddGarage,
addGarage
};