const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const userController = require('../controllers/user.controller');
const IsLoggedInMiddleware=require('../middleware/login.middleware');
const sanitizerMiddleware=require('../middleware/sanitizer.middleware');

Router.route('/register')
    .get(userController.renderRegister)
    .post(sanitizerMiddleware(),userController.register)

Router.route('/login')
    .get(userController.renderLogin)
    .post(sanitizerMiddleware(),userController.login)

Router.route('/verify')
    .get(IsLoggedInMiddleware(),userController.renderVerify)
    .post(IsLoggedInMiddleware(),userController.verify)

Router.route('/dashboard')    
    .get(IsLoggedInMiddleware(),userController.renderDashboard)

Router.route('/changeimage')
    .get(IsLoggedInMiddleware(), userController.renderImage)
    .post(upload.single('image'),IsLoggedInMiddleware(),userController.uploadImage);

Router.route('/logout')
    .delete(IsLoggedInMiddleware(), userController.logout);

module.exports=Router;