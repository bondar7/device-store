const ApiError = require('../error/ApiError');
const Wishlist = require('../model/Wishlist');
const WishlistDevice = require('../model/WishlistDevice');
const Device = require('../model/Device');

class WishlistController {
    async add(req, res, next) {
        try {
            const userId = req.user.id;
            const {deviceId} = req.body;
            if (!userId) return next(ApiError.forbidden("Authorization error"));
            if (!deviceId) return next(ApiError.badRequest("Device ID is required"));
            const wishlist = await Wishlist.findOne({where: {userId}});
            if (!wishlist) return next(ApiError.badRequest("Wishlist not found"));
            const device = await WishlistDevice.create(
                {
                    wishlistId: wishlist.id,
                    deviceId: deviceId
                }
            );
            return res.status(200).json(device);
        } catch (e) {
            return next(ApiError.internal("Something went wrong. Try again later."));
        }
    }
    async delete(req, res, next) {
        try {
            const {deviceId} = req.params;
            const wishlistDevice = await WishlistDevice.findOne({where: {deviceId}});
            if (wishlistDevice) return next(ApiError.badRequest("Device not found"));
            await wishlistDevice.destroy();
            return res.json({ message: "Device removed from wishlist"});
        } catch (e) {
            return next(ApiError.internal("Something went wrong. Try again later."));
        }
    }
    async getUserWishlist(req, res, next) {
        try {
            const userId = req.user.id;
            if (!userId) return next(ApiError.forbidden("Authorization error"));
            const wishlist = await Wishlist.findOne(
                {
                    where: {userId},
                    include: [
                        {
                            model: WishlistDevice,
                            as: "devices",
                            include: [
                                {
                                    model: Device
                                }
                            ]
                        }
                    ]
                }
            );
            if (!wishlist) return next(ApiError.badRequest("Wishlist nor found"));
            return res.status(200).json(wishlist);
        } catch (e) {
            return next(ApiError.internal("Something went wrong. Try again later."));
        }
    }
}

module.exports = new WishlistController();