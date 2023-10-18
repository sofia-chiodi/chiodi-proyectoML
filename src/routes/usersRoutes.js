const express = require('express');

const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

/* Login */
usersRouter.get('/login', usersController.loginForm);
usersRouter.post('/login', usersController.loginForm);

/* Register*/
usersRouter.get('/register', usersController.registerForm);
usersRouter.post('/register', usersController.register);

module.exports = usersRouter;
