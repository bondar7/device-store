const sequelize = require("../db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define("review", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    deviceId: {type: DataTypes.STRING, allowNull: false},
})