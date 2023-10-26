const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'gaboot',
  username: 'root',
  password: '',
  host: '127.0.0.1',
  port: 3306, // Replace with your database port
});

module.exports = { sequelize };