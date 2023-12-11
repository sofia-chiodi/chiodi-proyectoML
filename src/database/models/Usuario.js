const Sequelize = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuarios', {
  email: {
    type: dataTypes.STRING,
  },
  password: {
    type: dataTypes.STRING,
  },
});

module.exports = Usuario;
