const usersController = {
  loginForm: (req, res) => {
    return res.render('login');
  },
  login: (req, res) => {
    return res.redirect('/');
  },
  registerForm: (req, res) => {
    return res.render('register');
  },
  register: (req, res) => {
    return res.redirect('login');
  },
};

module.exports = usersController;
