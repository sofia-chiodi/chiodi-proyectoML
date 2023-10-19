const express = require('express');
const upload = require('../middlewares/users-multer');

const { body } = require('express-validator');

const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

const validations = [
  body('fullName').notEmpty().withMessage('Ingresá tu nombre'),
  body('email')
    .notEmpty()
    .withMessage('Ingresá tu correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Ingresá un correo electrónico válido'),
  body('address').notEmpty().withMessage('Ingresá tu dirección'),
  body('birthDate')
    .notEmpty()
    .withMessage('Ingresá tu fecha de nacimiento')
    .bail()
    .isDate()
    .withMessage('Ingresá una fecha válida'),
  body('username').notEmpty().withMessage('Ingresá un nombre de usuario'),
  body('password')
    .notEmpty()
    .withMessage('Ingresá una contraseña')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirmá la contraseña')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
];

/* Login */
usersRouter.get('/login', usersController.loginForm);
usersRouter.post('/login', usersController.loginForm);

/* Register*/
usersRouter.get('/register', usersController.registerForm);
usersRouter.post(
  '/register',
  upload.single('profilePicture'),
  validations,
  usersController.register
);

module.exports = usersRouter;
