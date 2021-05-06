const express = require('express');
const Router = express.Router();
const userController = require('../controllers/user.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware')

Router.route('/register')
    .get(userController.renderRegister)
    .post(userController.register)

Router.route('/login')
    .get(userController.renderLogin)
    .post(userController.login)

Router.route('/dashboard')    
    .get(IsLoggedInMiddleware(),userController.renderDashboard)

module.exports=Router;