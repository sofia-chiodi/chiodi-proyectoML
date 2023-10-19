/* Requires */
const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const upload = require('../middlewares/users-multer');

const { body } = require('express-validator');
const path = require('path');

/* Validations */

const registerValidations = [
  body('fullName').notEmpty().withMessage('Ingresá tu nombre'),
  body('email')
    .notEmpty()
    .withMessage('Ingresá tu correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Ingresá un correo electrónico válido'),
  body('address').notEmpty().withMessage('Ingresá tu dirección'),
  body('birthDate').notEmpty().withMessage('Ingresá tu fecha de nacimiento'),
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
  body('profilePicture').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];

    if (!file) {
      throw new Error('Subí una foto de perfil');
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ', '
          )}`
        );
      }
    }
    return true;
  }),
];

const loginValidations = [
  body('username').notEmpty().withMessage('Ingresá un nombre de usuario'),
  body('password')
    .notEmpty()
    .withMessage('Ingresá tu contraseña')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
];

/* Login */
usersRouter.get('/login', usersController.loginForm);
usersRouter.post('/login', loginValidations, usersController.login);

/* Register*/
usersRouter.get('/register', usersController.registerForm);
usersRouter.post(
  '/register',
  upload.single('profilePicture'),
  registerValidations,
  usersController.register
);

module.exports = usersRouter;
