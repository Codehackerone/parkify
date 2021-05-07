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

const renderGarage = async (req, res) => {
    var garage_id = req.params.id;
    const garage = await garageService.FindGarage(garage_id);
    if (!garage) {
        res.send('Garage Not Found.');
    } else {
        res.send(garage);
    }
};

module.exports={
renderAddGarage,
addGarage,
renderGarage
};