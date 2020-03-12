const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chat = sequelize.define('chat', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey : true
    },
    message: {
        type : Sequelize.STRING,
        allowNull: false,
    },
    user_id_sender: {
        type : Sequelize.INTEGER,
        allowNull: false,
    },
    user_id_reciever: {
        type : Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Chat;