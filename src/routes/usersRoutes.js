const express = require('express');

const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/login', usersController.login);
usersRouter.get('/register', usersController.register);

module.exports = usersRouter;