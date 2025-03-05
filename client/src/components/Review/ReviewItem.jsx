import React, {useContext, useState} from 'react';
import {Card} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import saveIcon from "../../assets/save.png";
import {deleteReview, updateReview} from "../../http/reviewAPI";
import {Rating} from "@smastrom/react-rating";
import {format} from "date-fns";

const ReviewItem = observer(({ review: item }) => {
    const {user, review} = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [rating, setRating] = useState(item.rating);
    const isCreator = user.user.id === item.userId;
    const handleEdit = () => {
        setIsEditing(true);
        setTitle(item.title);
        setDescription(item.description);
        setRating(item.rating);
    }
    const handleSave = () => {
        if (title !== "" && description !== "") {
            updateReview(item.id, title, description, rating).then(data => {
                const updatedReview = data[1];
                console.log(updatedReview);
                setIsEditing(false);
                // update it in mobX store
                review.setReviews(
                    review.reviews.map(r =>
                        r.id === updatedReview.id
                            ?
                            { ...r,
                                title: updatedReview.title,
                                description: updatedReview.description,
                                rating: updatedReview.rating,
                                updatedAt: updatedReview.updatedAt
                            }
                            : r
                    )
                );
            }).catch(e => console.log(e));
        }
    }
    const handleDelete = () => {
        deleteReview(item.id).then(data => {
           review.setReviews(review.reviews.filter(r => r.id !== item.id));
           review.checkExists(user.user.id);
        }).catch(e => console.log(e));
    }
    return (
        <Card className="mb-3 shadow-sm" style={{ borderRadius: '10px' }}>
            <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="w-100">
                        <div className="d-flex justify-content-between">
                            <strong
                                className="me-2">{item.username.length > 15 ? item.username.substring(0, 15) + '...' : item.username}
                            </strong>
                            <div className="d-flex gap-2">
                                {isCreator && (
                                    <img
                                        width={28}
                                        height={28}
                                        src={isEditing ? saveIcon : editIcon}
                                        alt=""
                                        onClick={isEditing ? handleSave : handleEdit}
                                        className="cursor-pointer"
                                        role="button"
                                    />
                                )}
                                {(user.isAdmin || isCreator) && (
                                    <img
                                        width={25}
                                        height={25}
                                        src={deleteIcon}
                                        alt="Delete"
                                        onClick={handleDelete}
                                        className="cursor-pointer"
                                        role="button"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="mb-2">
                                {
                                    isEditing ? (
                                        <Rating
                                            style={{maxWidth: 150}} // Set max width for the Rating component
                                            value={rating}            // Controlled value for the rating
                                            onChange={(newRating) => setRating(newRating)} // Update the rating state when changed
                                        />
                                    ) : (
                                        // Render stars for viewing when not editing
                                        [...Array(item.rating)].map((_, i) => (
                                            <StarFill key={i} className="text-warning me-1"/>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isEditing ? (
                        <>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control mb-2"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control mb-2"
                            />
                        </>
                    ) : (
                        <>
                            <h5>{title}</h5>
                            <Card.Text>{description}</Card.Text>
                        </>
                    )
                }

                <small
                    className="text-muted">{format(new Date(item.updatedAt ? item.updatedAt : item.createdAt), 'MMMM dd, yyyy H:mm a')}</small>
            </Card.Body>
        </Card>
)
    ;
});

export default ReviewItem;