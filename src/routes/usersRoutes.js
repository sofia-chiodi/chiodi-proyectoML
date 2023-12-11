/* Requires */
const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

/* Middlewares */
const upload = require('../middlewares/multerU');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Login validations
const loginValidations = require('../validations/login');
const loginValidateForm = require('../middlewares/validate-login-form');

// Register validations
const registerValidations = require('../validations/register');
const registerValidateForm = require('../middlewares/validate-register-form');

/* Register*/
usersRouter.get('/register', guestMiddleware, usersController.registerForm);
usersRouter.post(
  '/register',
  upload.single('profilePicture'),
  registerValidations,
  registerValidateForm,
  usersController.register
);

/* Login */
usersRouter.get('/login', guestMiddleware, usersController.loginForm);
usersRouter.post(
  '/login',
  loginValidations,
  loginValidateForm,
  usersController.login
);

/* Profile*/
usersRouter.get('/profile', authMiddleware, usersController.profile);

/* Logout */
usersRouter.get('/logout', usersController.logout);

module.exports = usersRouter;
