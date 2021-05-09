const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const garageController = require('../controllers/garage.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware');
const sanitizerMiddleware=require('../middleware/sanitizer.middleware');
const IsAdminMiddleware=require('../middleware/isadmin.middleware');

Router.route('/')
    .get(IsLoggedInMiddleware(),garageController.renderAllGarages)

Router.route('/add')
    .get(IsLoggedInMiddleware(),IsAdminMiddleware(),garageController.renderAddGarage)
    .post(IsLoggedInMiddleware(),IsAdminMiddleware(),sanitizerMiddleware(),upload.single('image'),garageController.addGarage)

Router.route('/:id')
    .get(IsLoggedInMiddleware(),garageController.renderGarage)
    .delete(IsLoggedInMiddleware(),IsAdminMiddleware(),garageController.deleteGarage);

Router.route('/apislot/:id')
    .get(garageController.apiSlotInfo);

module.exports=Router;