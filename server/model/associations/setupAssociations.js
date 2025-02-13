const User = require('../User');
const Basket = require('../Basket');
const BasketDevice = require('../BasketDevice');
const Device = require('../Device');
const DeviceInfo = require('../DeviceInfo');
const Rating = require('../Rating');
const Review = require('../Review');
const Type = require('../Type');
const Brand = require('../Brand');
const TypeBrand = require('../TypeBrand');
const RefreshToken = require('../RefreshToken');

function setupAssociations() {
    User.hasOne(Basket);
    Basket.belongsTo(User);

    User.hasMany(Review);
    Review.belongsTo(User);
    Device.hasMany(Review);
    Review.belongsTo(Device);

    User.hasMany(Rating);
    Rating.belongsTo(User);

    User.hasMany(RefreshToken);
    RefreshToken.belongsTo(User);

    Type.hasMany(Device);
    Device.belongsTo(Type);
    Brand.hasMany(Device);
    Device.belongsTo(Brand);

    Basket.hasMany(BasketDevice, {as: "devices"});
    BasketDevice.belongsTo(Basket, {foreignKey: "basketId"});

    Device.hasMany(BasketDevice);
    BasketDevice.belongsTo(Device);

    Device.hasMany(DeviceInfo, {as: "info"});
    DeviceInfo.belongsTo(Device, { foreignKey: "deviceId" });

    Type.belongsToMany(Brand, {through: TypeBrand});
    Brand.belongsToMany(Type, {through: TypeBrand});
}

module.exports = setupAssociations;