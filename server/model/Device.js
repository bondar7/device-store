const sequelize = require('../db');
const {DataTypes} = require('sequelize');

module.exports = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    brandId: { type: DataTypes.INTEGER, allowNull: false },
    brandName: { type: DataTypes.STRING, allowNull: false },
    typeId: { type: DataTypes.INTEGER, allowNull: false }
})