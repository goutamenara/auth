const { Sequelize, DataTypes } = require('sequelize');
const config = require('./../config');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.sqlite.path
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  }
});

module.exports = User