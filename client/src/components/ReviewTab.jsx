import React, { useEffect, useState, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import { Button, Form, Card, Row, Col, Modal } from 'react-bootstrap';
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { AppContext } from '../AppContext';
import './reviewTab.css';

export default function ReviewTab() {
    const {gameId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ title: '', content: '', rating: 0});
    const [hoverRating, setHoverRating] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [userReview, setUserReview] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const { user } = useContext(AppContext);

    useEffect(() => {
        fetch(`/games/${gameId}/reviews`)
        .then((resp) => resp.json())
        .then((data) => {
            setReviews(data.reviews)
            calculateAverageRating(data.reviews)

            if (user) {
                const existingReview = data.reviews.find(review => review.author.id ===user.id)
                if(existingReview) {
                    setUserReview(existingReview)
                } else {
                    setUserReview(null)
                }
            }
        })
        .catch((error) => console.error("Error with fetching game reviews:", error))
    }, [gameId, user])

    // show modal with a message
    const showModalWithMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    // close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage('');
    };

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            setAverageRating(0);
            return;
        }

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating.toFixed(1)); // round to one decimal place
    };

    //Handle posting a review
    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/reviews/add', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                ...newReview,
                game_id: gameId,
                rating: newReview.rating
            }),
        })
        .then((resp) => {
            if (!resp.ok) {
                return resp.json().then(data =>{
                    throw new Error(data.error || "Failed to submit review.")
                })
            }
            return resp.json()
        })
        .then((data) => {
            setReviews([...reviews, data.review]);
            setNewReview({ title: '', content: '', rating: 0 });
            setUserReview(data.review);
        })
    }

    const handleRatingClick = (ratingValue) => {
        setNewReview({ ...newReview, rating: ratingValue });
    };

    const handleLikeDislike = (reviewId, isLike, authorId) => {

        // check if the user is logged in - if visitor tries to like/dislike
        if (!user) {
            showModalWithMessage(
                <span>
                    You need to be logged in to react to reviews. Please{" "}
                    <Link to="/login">log in</Link> or{" "}
                    <Link to="/signup">sign up</Link>.
                </span>
            );
            return;
        }

        // check if the user is trying to like/dislike their own review
        if (authorId === user.id) {
            showModalWithMessage("You can't like or dislike your own review.");
            return;
        }

        fetch('/reviews/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review_id: reviewId, is_like: isLike }),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review.id === reviewId ? { ...review, likes_count: data.likes_count } : review
                )
            )
        })
    }

    return (
        <div className="review-container">
            <Row>
                <h2>Write a Review</h2>
                {user && (
                    <>
                        {userReview ? (
                            <p>
                                You have already reviewed this game! Check out your review{' '}
                                <Link to={'/myreviews'}>here</Link>.
                            </p>
                        ) : (
                            <Form className="review-form" onSubmit={handleSubmit}>
                                <Form.Group className="review-form-group" controlId="Title">
                                <Form.Label>Review Title:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter a title for your review" 
                                    value={newReview.title}
                                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                    required
                                />
                                </Form.Group>

                                <Form.Group className="review-form-group" controlId="Content">
                                <Form.Label>Write your review:</Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    rows={3}
                                    placeholder="Type..." 
                                    value={newReview.content}
                                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                    required
                                    />
                                </Form.Group>

                                <Form.Group className="review-form-group" controlId="rating">
                                <Form.Label>Rating:</Form.Label>
                                <div className="star-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`star ${newReview.rating >= star || hoverRating >= star ? 'filled' : ''}`}
                                                onClick={() => handleRatingClick(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                            />
                                        ))}
                                    </div>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                Submit Review
                                </Button>
                            </Form>
                        )}
                    </>
                )}
                {!user && (
                    <p>
                        Please log in to write a review. <br />
                        No account yet? Register a user account <Link to="/signup">here</Link>
                    </p>
                )}
            </Row>
            
            {/* Reviews Section */}
            <Row className="average-rating-row">
                <h2>User Reviews</h2>
                {averageRating > 0 ? (
                    <div className="average-rating">
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`star ${averageRating >= star ? 'filled' : ''}`}
                                />
                            ))}
                        </div>
                        <span>({averageRating}/5)</span>
                    </div>
                ) : (
                    <p>No ratings yet</p>
                )}
            </Row>
            
            <Row className="review-list-row">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Col key={review.id} md={6} className="mb-4">
                            <Card className="review-card">
                                <Card.Body>
                                    <Card.Title>{review.title}</Card.Title>
                                    <Card.Text>{review.content}</Card.Text>
                                    <p><em>Written by {review.author.username || review.author} on {new Date(review.created_at).toLocaleDateString()}</em></p>

                                    <div className="user-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`star ${review.rating >= star ? 'filled' : ''}`}
                                            />
                                        ))}
                                    </div>

                                    <Card.Footer className="text-muted">
                                        <p>
                                            {review.likes_count > 0 ? 
                                                `${review.likes_count} ${review.likes_count === 1 ? 'person has' : 'people have'} liked this review!`
                                                : "Was this review helpful?"}
                                        </p>
                                        
                                        {user && review.author.id !== user.id && (
                                            <div className="like-dislike-buttons">
                                                <Button variant="primary" onClick={() => handleLikeDislike(review.id, true, review.author.id)} style={{margin: "10px"}}>
                                                    <FaThumbsUp />
                                                </Button>
                                                <Button variant="danger" onClick={() => handleLikeDislike(review.id, false, review.author.id)} style={{margin: "10px"}}>
                                                    <FaThumbsDown />
                                                </Button>
                                            </div>
                                        )}
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="no-reviews-text">No reviews yet. Be the first to write one!</p>
                )}
            </Row>


            {/* modal messages */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )

}