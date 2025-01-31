const Type = require('../model/Type');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            if (!name) return next(ApiError.badRequest('Type name is required!'));
            if (await Type.findOne({where: {name}})) return next(ApiError.badRequest('Type already exists!'));
            const type = await Type.create({name});
            return res.status(200).json(type);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };
    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();
            return res.status(200).json(types);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    };
}

module.exports = new TypeController();