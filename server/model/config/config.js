const User = require('../User');
const Basket = require('../Basket');
const BasketDevice = require('../BasketDevice');
const Device = require('../Device');
const DeviceInfo = require('../DeviceInfo');
const Rating = require('../Rating');
const Type = require('../Type');
const Brand = require('../Brand');
const TypeBrand = require('../TypeBrand');

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);
Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});