const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'), // SQLite file
  logging: false
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Picture = require('./picture')(sequelize, Sequelize.DataTypes);

module.exports = db;