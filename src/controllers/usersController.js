const usersController = {
  registerForm: (req, res) => {
    return res.render('register');
  },
  register: (req, res) => {
    return res.send(req.body);
  },
  loginForm: (req, res) => {
    return res.render('login');
  },
  login: (req, res) => {
    return res.redirect('/');
  },
};

module.exports = usersController;
