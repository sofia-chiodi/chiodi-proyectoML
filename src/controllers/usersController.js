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
    userServices.createUser(user);
    res.redirect('login');
  },
  loginForm: (req, res) => {
    const errors = req.session.errors;
    const oldData = req.session.oldData;
    req.session.errors = null;
    req.session.oldData = null;
    res.render('login', {
      errors: errors ? errors : null,
      oldData: oldData ? oldData : null,
    });
  },
  login: (req, res) => {
    const data = req.body;
    req.session.userData = data;
    res.redirect('/');
  },
};

module.exports = usersController;
