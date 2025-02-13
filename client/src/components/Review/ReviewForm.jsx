import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Button, Card, Form} from "react-bootstrap";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {createReview} from "../../http/reviewAPI";
import {observer} from "mobx-react-lite";

const ReviewForm = observer(({userId, deviceId}) => {
    const {review} = useContext(Context);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };
    const onCreate = () => {
        if (title && description) {
            const newReview = {
                userId: userId,
                deviceId: deviceId,
                title: title,
                description: description,
                rating: rating
            };
            createReview(newReview).then(data => {
                review.setExists(true);
                review.setReviews([...review.reviews, data]);
            }).catch(e => console.log(e));
        }
    }
    return (
        <Card className="m-3 mt-5">
            <Card.Body>
                <Form>
                    <Form.Group className="d-flex gap-3 flex-column align-items-center">
                        <h3>Write a review</h3>
                        <div className="w-100">
                            <Rating style={{maxWidth: 150}} value={rating} onChange={ratingChanged} />
                        </div>
                        <Form.Control
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button onClick={onCreate} style={{ minWidth: 250 }} variant="outline-dark">
                            Send Review
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
});

export default ReviewForm;