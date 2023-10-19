const { validationResult } = require('express-validator');

const usersController = {
  registerForm: (req, res) => {
    return res.render('register');
  },
  register: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('register', {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
  },
  loginForm: (req, res) => {
    return res.render('login');
  },
  login: (req, res) => {
    return res.redirect('/');
  },
};

module.exports = usersController;
