const slotService = require('../services/slot.service');

const renderAddSlot = (req, res) => {
    res.send('Add Slot');
};

const addSlot=async (req,res)=>
{
    try {
        const result = await slotService.AddSlot(req.body);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

module.exports={
    renderAddSlot,
    addSlot
};