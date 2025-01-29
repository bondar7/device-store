const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})