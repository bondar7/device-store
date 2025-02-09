const ApiError = require("../error/ApiError");
const Basket = require("../model/Basket");
const BasketDevice = require("../model/BasketDevice");
const Device = require("../model/Device");

class BasketController {
    async getUserBasket(req, res, next) {
        try {
            const {userId} = req.params;
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
            console.log(e);
        }
    }
}

module.exports = new BasketController();