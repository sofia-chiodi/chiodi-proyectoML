/* Require's */
const express = require('express');
const mainRouter = express.Router();
const mainController = require('../controllers/mainController');

/* Routes */

// Main
mainRouter.get('/', mainController.index);

// Products
const productsRoutes = require('./productsRoutes.js');
mainRouter.use('/products', productsRoutes);

// Users
const usersRoutes = require('./usersRoutes.js');
mainRouter.use('/users', usersRoutes);

module.exports = mainRouter;
