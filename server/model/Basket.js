const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, unique: true, allowNull: false},
})