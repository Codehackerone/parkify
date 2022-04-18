/* ------------ Imports  ----------- */

const express = require('express');
const Router = express.Router();
const slotController = require('../controllers/slot.controller');
const IsLoggedInMiddleware = require('../middleware/login.middleware');
const sanitizerMiddleware = require('../middleware/sanitizer.middleware');
const IsAdminMiddleware = require('../middleware/isadmin.middleware');

/* ------------ Endpoint Definitions ----------- */

Router.route('/add/:id')
    .get(
        IsLoggedInMiddleware(),
        IsAdminMiddleware(),
        slotController.renderAddSlot
    )
    .post(IsLoggedInMiddleware(), IsAdminMiddleware(), slotController.addSlot);

Router.route('/:id')
    .get(IsLoggedInMiddleware(), slotController.renderSlot)
    .delete(
        IsLoggedInMiddleware(),
        IsAdminMiddleware(),
        slotController.deleteSlot
    );

Router.route('/garage/:id').get(
    IsLoggedInMiddleware(),
    slotController.renderSlots
);

Router.route('/apibooking/:id').get(slotController.apiBooking);

module.exports = Router;
