const express = require('express');
const Router = express.Router();
const slotController = require('../controllers/slot.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware');
const sanitizerMiddleware=require('../middleware/sanitizer.middleware');

Router.route('/add')
    .get(slotController.renderAddSlot)
    .post(slotController.addSlot)

Router.route('/:id')
    .get(slotController.renderSlot)
    
module.exports=Router;