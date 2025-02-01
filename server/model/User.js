const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    roles: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['USER']},
});