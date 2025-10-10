const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Order = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

module.exports = Order;