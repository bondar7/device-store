const { Op, fn, col } = require('sequelize');
const Review = require('../../model/Review');

const getAverageRating = async (deviceId) => {
    try {
        // Fetch the count and sum of ratings in a single query
        const reviews = await Review.findOne({
            attributes: [
                [fn('COUNT', col('id')), 'count'], // Count of reviews
                [fn('SUM', col('rating')), 'totalRatings'], // Sum of all ratings
            ],
            where: { deviceId },
        });

        const count = reviews.get('count');
        const totalRatings = reviews.get('totalRatings');

        // Handle case where no reviews exist (avoid division by zero)
        if (count === 0) {
            return 0; // Or you can return a default value such as null or a message
        }

        // Calculate average rating
        const avgRating = parseFloat((totalRatings / count).toFixed(1));

        return avgRating;

    } catch (error) {
        console.error("Error calculating average rating:", error);
        return null; // Or handle errors as per your use case
    }
};

module.exports = getAverageRating;
