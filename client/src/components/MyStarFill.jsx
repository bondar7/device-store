import React from 'react';
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const MyStarFill = ({ rating }) => {
    // Ensure the rating is a number and valid
    const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;

    // Calculate the full stars, half stars, and empty stars
    const fullStars = Math.floor(safeRating); // The whole number part (e.g., 3 for 3.5)
    const halfStars = safeRating % 1 !== 0; // If there's a decimal part, it's a half star
    const emptyStars = Math.max(0, 5 - fullStars - (halfStars ? 1 : 0)); // Ensure no negative empty stars

    // Ensure we don't attempt to create an invalid array
    const fullStarsArray = Array.from({ length: fullStars });
    const emptyStarsArray = Array.from({ length: emptyStars });

    return (
        <div>
            {/* Render full stars */}
            {fullStarsArray.map((_, i) => (
                <StarFill key={`full-${i}`} className="text-warning me-1" />
            ))}

            {/* Render half star if needed */}
            {halfStars && <StarHalf className="text-warning me-1" />}

            {/* Render empty stars */}
            {emptyStarsArray.map((_, i) => (
                <Star className="text-warning me-1" key={`empty-${i}`} />
            ))}
        </div>
    );
};

export default MyStarFill;
