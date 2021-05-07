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

const renderSlot = async (req, res) => {
    var slot_id = req.params.id;
    const slot = await slotService.FindSlot(slot_id);
    if (!slot) {
        res.send('Slot Not Found.');
    } else {
        res.send(slot);
    }
};
module.exports={
    renderAddSlot,
    addSlot,
    renderSlot
};