const userServices = require('../services/userServices');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersController = {
  registerForm: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.oldData = null;
    req.session.oldData = null;
    res.render('register', {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
    });
  },
  register: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('register', {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    const data = req.body;
    const user = {
      fullName: data.fullName,
      email: data.email,
      address: data.address,
      birthDate: data.birthDate,
      userType: data.userType,
      interests: data.interests,
      username: data.username,
      password: bcrypt.hashSync(data.password, 10),
      confirmPassword: data.confirmPassword,
      profilePicture: req.file
        ? req.file.filename
        : 'default-profile-picture.png',
    };
    const userInDB = userServices.getUserByField('username', req.body.username);

    if (userInDB) {
      return res.render('register', {
        errors: {
          username: {
            msg: 'Este usuario ya se encuentra registrado',
          },
        },
        oldData: req.body,
      });
    }

    userServices.createUser(user);
    res.redirect('login');
  },
  loginForm: (req, res) => {
    return res.render('login');
  },
  login: (req, res) => {
    const userToLogin = userServices.getUserByField(
      'username',
      req.body.username
    );

    if (userToLogin) {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (validPassword) {
        delete userToLogin.password;
        delete userToLogin.confirmPassword;
        req.session.userLogged = userToLogin;
        return res.redirect('/users/profile');
      }
      return res.render('login', {
        errors: {
          password: {
            msg: 'El usuario y/o contraseña ingresados son inválidos',
          },
        },
      });
    }

    return res.render('login', {
      errors: {
        username: {
          msg: 'Nombre de usuario incorrecto',
        },
      },
    });
  },
  profile: (req, res) => {
    res.render('profile', {
      user: req.session.userLogged,
    });
  },
};

module.exports = usersController;
