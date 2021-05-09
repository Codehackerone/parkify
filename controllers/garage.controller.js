const garageService = require('../services/garage.service');
const slotService=require('../services/slot.service');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


const renderAddGarage = (req, res) => {
    res.render('garages/newgarages');
};

const addGarage=async (req,res)=>
{
    try {
        if(req.file){
        var path = req.file.path;
        req.body.picture_url=path;
        }
        const geoData = await geocoder.forwardGeocode({
            query: req.body.location,
            limit: 1
        }).send();
        req.body.geometry = geoData.body.features[0].geometry;
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
        res.render('garages/viewgarage',{garage:garage,maptoken:mapBoxToken});
    }
};

const renderAllGarages=async(req,res)=>{
    var garages=await garageService.AllGarages();
    res.render('garages/allgarages',{garages:garages});
}

const apiSlotInfo=async(req,res)=>
{
    var garage_id=req.params.id;
    var garage=await garageService.FindGarage(garage_id);
    if(!garage)return "Garage Not Found";
    var slots=garage.slots;
    var arr_slot=[]
    var large=0,medium=0,small=0;
    for(var slot of slots)
    {
        var slot_size=await slotService.FindSlot(slot);
        arr_slot.push(slot_size.type);
    }
    for(var size of arr_slot)
    {
        if(size==='Large')large++;
        else if(size==='Medium')medium++;
        else small++;
    }
    var str=`${large} Large, ${medium} Medium and ${small} Small Available.`;
    res.send(str);
}

module.exports={
renderAddGarage,
addGarage,
renderGarage,
renderAllGarages,
apiSlotInfo
};