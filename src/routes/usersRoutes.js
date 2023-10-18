const express = require('express');
const upload = require('../middlewares/users-multer');

const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

/* Login */
usersRouter.get('/login', usersController.loginForm);
usersRouter.post('/login', usersController.loginForm);

/* Register*/
usersRouter.get('/register', usersController.registerForm);
usersRouter.post(
  '/register',
  upload.single('profilePicture'),
  usersController.register
);

module.exports = usersRouter;
