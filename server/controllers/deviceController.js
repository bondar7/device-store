const Device = require('../model/Device');
const DeviceInfo = require('../model/DeviceInfo');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, devicePrice, brandId, typeId, info} = req.body;
            if (!name) return next(ApiError.badRequest('Name is required!'));
            if (!devicePrice) return next(ApiError.badRequest('Price is required!'));
            if (!brandId) return next(ApiError.badRequest('Select brand!'));
            if (!typeId) return next(ApiError.badRequest('Select type!'));
            if (!req.files) return next(ApiError.badRequest('Image is required!'));
            const {img} = req.files;
            const fileName = uuid.v4() + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create(
                {
                name,
                price: devicePrice,
                img: fileName,
                brandId,
                typeId,
                });
            if (info) {
                JSON.parse(info).forEach(item => {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id
                    });
                })
            }

            res.status(200).json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, page, limit} = req.query;
            page = Number(page) || 1;
            limit = Number(limit) || 9;
            let offset = page * limit - limit;

            if (!brandId && !typeId) {
                const devices = await Device.findAndCountAll({limit, offset});
                return res.status(200).json(devices);
            }
            if (!brandId && typeId) {
                const devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
                return res.status(200).json(devices);
            }
            if (brandId && !typeId) {
                const devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
                return res.status(200).json(devices);
            }
            if (brandId && typeId) {
                const devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset});
                return res.status(200).json(devices);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getById(req, res, next) {
        const {id} = req.params;
        if (!id) return next(ApiError.badRequest("ID is required!"));
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: "info"}]
            }
        );
        console.log(device);
       return res.json(device);
    }
}

module.exports = new DeviceController();