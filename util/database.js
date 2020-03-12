const Sequelize = require('sequelize');

const sequelize = new Sequelize('test-sample-database', 'root', '', {
    dialect : 'mysql',
    host : 'localhost',
});

module.exports = sequelize;