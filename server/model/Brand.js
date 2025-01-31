const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})