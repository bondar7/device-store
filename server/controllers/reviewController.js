const ApiError = require("../error/ApiError");
const Review = require("../model/Review");

class ReviewController {
    async create(req, res, next) {
        try {
            const {title, description, deviceId, rating} = req.body;
            const userId = req.user.id;
            if (!title) return next(ApiError.badRequest("Title is required"));
            if (!description) return next(ApiError.badRequest("Description is required"));
            if (!deviceId) return next(ApiError.badRequest("Device ID is required"));
            if (!userId) return next(ApiError.forbidden("Auth error"));
            if (!rating) return next(ApiError.forbidden("Rating is required"));

            const review = await Review.create({
                title,
                description,
                userId,
                deviceId,
                rating
            });
            return res.status(200).json(review);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            if (!id) return next(ApiError.badRequest("ID is required"));
            const review = await Review.findOne({where: {id}});
            if (!review) return next(ApiError.badRequest("Not found"));
            await review.destroy();
            return res.json({message: "Review removed successfully"});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async getAll(req, res, next) {
        try {
            let {deviceId, page, limit} = req.query;
            console.log(deviceId)
            if (!deviceId) return next(ApiError.badRequest("Device ID is required"));
            page = Number(page) || 1;
            limit = Number(limit) || 3;
            let offset = page * limit - limit;
            const reviews = await Review.findAndCountAll({where: {deviceId}, limit, offset});
            return res.status(200).json(reviews);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async updateReview(req, res, next) {
        try {
            const {reviewId} = req.params;
            const {title, description, rating} = req.body;
            console.log(reviewId, title, description, rating)
            const updatedReview = await Review.update({
                title: title,
                description: description,
                rating: rating,
                createdAt: new Date()
            },
                {
                    where: {id: reviewId},
                    returning: true,    // Return the updated rows
                    plain: true         // Return a single object, not an array
                }
            );
            console.log(updatedReview)
            return res.status(200).json(updatedReview);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new ReviewController();