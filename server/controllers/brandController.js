const Brand = require('../model/Brand');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) return next(ApiError.badRequest('Brand name is required!'));
            if (await Brand.findOne({where: {name}})) return next(ApiError.badRequest('Brand already exists!'));
            const brand = await Brand.create({name});
            return res.status(200).json(brand);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll();
            return res.status(200).json(brands);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BrandController();