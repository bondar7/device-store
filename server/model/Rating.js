const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})