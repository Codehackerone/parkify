const express = require('express');
const Router = express.Router();
const garageController = require('../controllers/garage.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware');
const sanitizerMiddleware=require('../middleware/sanitizer.middleware');

Router.route('/add')
    .get(garageController.renderAddGarage)
    .post(garageController.addGarage)

Router.route('/:id')
    .get(garageController.renderGarage);

module.exports=Router;