const garageService = require("../services/garage.service");
const slotService = require("../services/slot.service");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
var axios = require("axios");

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

const renderfindgarage = async (req, res) => {
  res.render("garages/findgarage", { body: req.body });
};

const rendergaragebyip = async (req, res) => {
  if (req.ipv4 !== undefined) {
    var config = {
      method: "get",
      url: "http://ip-api.com/json/",
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  res.render("garages/foundgarage", { body: req.body, by: "IP" });
};

const rendergaragebyloc = async (req, res) => {
  try {
    if (!req.body.location) {
      req.flash("err", "location not given");
      res.redirect("/garage/find");
    } else {
      const geoData = await geocoder
        .forwardGeocode({
          query: req.body.location,
          limit: 1,
        })
        .send();
      var geometry = geoData.body.features[0].geometry;
      geometry.place_name = req.body.location;
      var garages = await garageService.AllGarages();
      var min_distance = 10000000.0;
      var dist = {};
      for (let garage of garages) {
        var distance = garageService.DistanceCal(
          geometry.coordinates[1],
          geometry.coordinates[0],
          garage.geometry.coordinates[1],
          garage.geometry.coordinates[0]
        );
        if (distance <= min_distance) {
          dist = garage;
          min_distance = distance;
        }
      }
      if (min_distance > 1000.0) {
        req.flash("err", "Sorry! No garages found within 1000.0 km radius.");
        res.redirect("/garage/find");
      } else {
        res.render("garages/foundgarage", {
          body: req.body,
          by: "Location",
          geometry: geometry,
          maptoken: mapBoxToken,
          garage: dist,
          min_distance: min_distance,
        });
      }
    }
  } catch (err) {
    req.flash("err", "Err: " + err);
    res.redirect("/garage/find");
  }
};

module.exports = {
  renderAddGarage,
  addGarage,
  renderGarage,
  renderAllGarages,
  apiSlotInfo,
  deleteGarage,
  renderfindgarage,
  rendergaragebyip,
  rendergaragebyloc,
};
