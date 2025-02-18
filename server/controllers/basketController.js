const ApiError = require("../error/ApiError");
const Basket = require("../model/Basket");
const BasketDevice = require("../model/BasketDevice");
const Device = require("../model/Device");

class BasketController {
    async getUserBasket(req, res, next) {
        try {
            const userId = req.user.id;
            console.log(userId);
            if (!userId) return next(ApiError.badRequest("ID is required!"));
            const basket = await Basket.findOne({
                where: {userId},
                include: [
                    {
                        model: BasketDevice,
                        as: "devices",
                        include: [
                            {
                                model: Device
                            }
                        ]
                    }
                ]
            });
            if (!basket) return ApiError.badRequest("Basket was not found for user with ID: ", userId);
            return res.status(200).json(basket);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async addToBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const {deviceId} = req.body;
            if (!userId) return next(ApiError.badRequest("User ID is required!"));
            if (!deviceId) return next(ApiError.badRequest("Device ID is required!"));

            const basket = await Basket.findOne({where: {userId}});
            if (!basket) return next(ApiError.badRequest("Basket not found!"));

            const basketDevice = await BasketDevice.findOne({where: { basketId: basket.id, deviceId}});
            if (basketDevice) {
                await basketDevice.update({quantity: basketDevice.quantity + 1});
                return res.json({ message: "Quantity updated successfully", basketDevice});
            } else {
                const newBasketDevice = await BasketDevice.create({
                    basketId: basket.id,
                    deviceId: deviceId,
                    quantity: 1
                });
                return res.json(newBasketDevice);
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async deleteFromBasket(req, res, next) {
        try {
            const {deviceId} = req.params;
            console.log(deviceId);
            const basketDevice = await BasketDevice.findOne({where: {deviceId: deviceId}});
            if (!basketDevice) return next(ApiError.badRequest("Device not found"));
            await basketDevice.destroy();
            return res.json({ message: "Device removed successfully"});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async updateQuantity(req, res, next) {
        try {
            const {deviceId, quantity} = req.body;
            if (!deviceId) return next(ApiError.badRequest("Device ID is required!"));
            const basketDevice = await BasketDevice.findOne({where: {id: deviceId}});
            if (!basketDevice) return next(ApiError.badRequest("Device not found"));
            await basketDevice.update({quantity: quantity});
            return res.json({ message: "Quantity updated successfully", basketDevice});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BasketController();