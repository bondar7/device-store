import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import ReviewItem from "./ReviewItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ReviewList = observer(() => {
    const {review} = useContext(Context);
    const reviews = review?.reviews;
    return (
        <Container className="mt-4">
            <div className="d-flex w-100 justify-content-center fw-semibold fs-3 mb-2">Reviews</div>
            {reviews?.map(review => <ReviewItem key={review.id} review={review}/>)}
        </Container>
    );
});

export default ReviewList;