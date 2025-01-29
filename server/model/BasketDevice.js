const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})