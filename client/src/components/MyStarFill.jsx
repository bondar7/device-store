import React, {useEffect, useState} from 'react';
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const MyStarFill = ({ rating }) => {
    // Ensure the rating is a number and valid
    const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;
    const [starSize, setStarSize] = useState(24);

    // Calculate the full stars, half stars, and empty stars
    const fullStars = Math.floor(safeRating); // The whole number part (e.g., 3 for 3.5)
    const halfStars = safeRating % 1 !== 0; // If there's a decimal part, it's a half star
    const emptyStars = Math.max(0, 5 - fullStars - (halfStars ? 1 : 0)); // Ensure no negative empty stars

    // Ensure we don't attempt to create an invalid array
    const fullStarsArray = Array.from({ length: fullStars });
    const emptyStarsArray = Array.from({ length: emptyStars });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setStarSize(14);  // Small size for mobile screens
            } else if (window.innerWidth <= 768) {
                setStarSize(18);  // Medium size for tablets
            } else {
                setStarSize(24);  // Default size for larger screens
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize); // Listen for window resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
    }, []);

    return (
        <div>
            {/* Render full stars */}
            {fullStarsArray.map((_, i) => (
                <StarFill key={`full-${i}`} className="text-warning me-1" style={{fontSize: `${starSize}px`}}/>
            ))}

            {/* Render half star if needed */}
            {halfStars && <StarHalf className="text-warning me-1" style={{fontSize: `${starSize}px`}}/>}

            {/* Render empty stars */}
            {emptyStarsArray.map((_, i) => (
                <Star className="text-warning me-1" key={`empty-${i}`} style={{fontSize: `${starSize}px`}}/>
            ))}
        </div>
    );
    };

    export default MyStarFill;
