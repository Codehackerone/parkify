const express = require('express');
const Router = express.Router();
const userController = require('../controllers/user.controller');

Router.route('/register')
    .get(userController.renderRegister)
    .post(userController.register)

Router.route('/login')
    .get(userController.renderLogin)
    .post(userController.login)

module.exports=Router;