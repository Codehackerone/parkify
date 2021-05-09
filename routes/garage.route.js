const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const garageController = require('../controllers/garage.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware');
const sanitizerMiddleware=require('../middleware/sanitizer.middleware');

Router.route('/')
    .get(garageController.renderAllGarages)

Router.route('/add')
    .get(garageController.renderAddGarage)
    .post(upload.single('image'),garageController.addGarage)

Router.route('/:id')
    .get(garageController.renderGarage)
    .delete(garageController.deleteGarage);

Router.route('/apislot/:id')
    .get(garageController.apiSlotInfo);

module.exports=Router;