const garageService = require("../services/garage.service");
const slotService = require("../services/slot.service");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const renderAddGarage = (req, res) => {
  res.render("garages/newgarages", { body: req.body });
};

const addGarage = async (req, res) => {
  try {
    if (req.file) {
      var path = req.file.path;
      req.body.picture_url = path;
    }
    const geoData = await geocoder
      .forwardGeocode({
        query: req.body.location,
        limit: 1,
      })
      .send();
    req.body.geometry = geoData.body.features[0].geometry;
    const result = await garageService.AddGarage(req.body);
    req.flash("success", "Garage Added Successfully");
    res.redirect("/garage/");
  } catch (err) {
    req.flash("err", "Error :" + err);
    res.redirect("/garage/add");
  }
};

const renderGarage = async (req, res) => {
  var garage_id = req.params.id;
  const garage = await garageService.FindGarage(garage_id);
  if (!garage) {
    req.flash("err", "Error :Garage Not Found!");
    res.redirect("/garage/");
  } else {
    res.render("garages/viewgarage", {
      garage: garage,
      maptoken: mapBoxToken,
      body: req.body,
    });
  }
};

const renderAllGarages = async (req, res) => {
  var garages = await garageService.AllGarages();
  res.render("garages/allgarages", {
    garages: garages,
    maptoken: mapBoxToken,
    body: req.body,
  });
};

const apiSlotInfo = async (req, res) => {
  var garage_id = req.params.id;
  var garage = await garageService.FindGarage(garage_id);
  if (!garage) return "Garage Not Found";
  var slots = garage.slots;
  var arr_slot = [];
  var large = 0,
    medium = 0,
    small = 0;
  for (var slot of slots) {
    var slot_size = await slotService.FindSlot(slot);
    arr_slot.push(slot_size.type);
  }
  for (var size of arr_slot) {
    if (size === "Large") large++;
    else if (size === "Medium") medium++;
    else small++;
  }
  var str = `${large} Large, ${medium} Medium and ${small} Small Available.`;
  res.send(str);
};

const deleteGarage = async (req, res) => {
  try {
    var id = req.params.id;
    await garageService.DeleteGarage(id);
    req.flash("success", "Garage Deleted Successfully");
    res.redirect("/garage/");
  } catch (err) {
    req.flash("err", "Error :" + err);
    res.redirect("/garage/");
  }
};

const renderfindgarage=async(req,res)=>
{
  res.render("garages/findgarage",{ body: req.body});
}

const renderfoundgarage=async(req,res)=>
{
  res.render("garages/foundgarage",{ body: req.body})
}

module.exports = {
  renderAddGarage,
  addGarage,
  renderGarage,
  renderAllGarages,
  apiSlotInfo,
  deleteGarage,
  renderfindgarage,
  renderfoundgarage
};
