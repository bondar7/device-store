const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('refresh_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    deviceId: {type: DataTypes.STRING, unique: true, allowNull: false},
    token: {type: DataTypes.STRING, unique: true}
});