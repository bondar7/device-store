import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import ReviewItem from "./ReviewItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ReviewList = observer(() => {
    const {review} = useContext(Context);
    const reviews = review?.reviews;
    return (
        <Container>
            {reviews?.map(review => <ReviewItem key={review.id} review={review}/>)}
        </Container>
    );
});

export default ReviewList;