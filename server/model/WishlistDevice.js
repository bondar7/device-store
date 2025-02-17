const sequelize = require("../db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define("wishlist_device", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    wishlistId: {type: DataTypes.INTEGER, allowNull: false},
    deviceId: {type: DataTypes.INTEGER, allowNull: false}
})