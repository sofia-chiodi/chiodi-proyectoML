const userServices = require('../services/userServices');

module.exports = (req, res, next) => {
  res.locals.isLogged = false;

  const usernameInCookie = req.cookies.userName;
  const userFromCookie = userServices.getUserByField(
    'username',
    usernameInCookie
  );

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
};
