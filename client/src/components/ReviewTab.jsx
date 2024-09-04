import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Card, Row, Col, Modal } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { AppContext } from '../AppContext';
import './reviewTab.css';

export default function ReviewTab() {
    const {gameId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ title: '', content: '', rating: 0});
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { user } = useContext(AppContext);

    useEffect(() => {
        fetch(`/games/${gameId}/reviews`)
        .then((resp) => resp.json())
        .then((data) => setReviews(data.reviews))
        .catch((error) => console.error("Error with fetching game reviews:", error))
    }, [gameId])

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

    //Handle posting a review
    const handleSubmit = (e) => {
        e.preventDefault()

        // check if the user has already reviewed the game
        const hasReviewed = reviews.some(review => review.author.id === user.id);
        if (hasReviewed) {
            showModalWithMessage('You have already reviewed this game!');
            return;
        }

        fetch('/reviews/add', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                ...newReview,
                game_id: gameId
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
            setNewReview({ title: '', content: '', rating: 0 })
        })
    }

    const handleLikeDislike = (reviewId, isLike, authorId) => {

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
                        <Form.Control 
                            type="number"
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                            min="1"
                            max="5"
                            required 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                        Submit Review
                        </Button>
                    </Form>
                )}
                {!user && <p>Please log in to write a review. <br />
                No account yet? Register a user account here</p>}
            </Row>

            <Row className="review-list-row">
                <h2>User Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Col key={review.id} md={6} className="mb-4">
                            <Card className="review-card">
                                <Card.Body>
                                    <Card.Title>{review.title}</Card.Title>
                                    <Card.Text>{review.content}</Card.Text>
                                    <p><em>Written by {review.author.username || review.author} on {new Date(review.created_at).toLocaleDateString()}</em></p>
                        
                                    <Card.Footer className="text-muted">
                                        <p>{review.likes_count > 0 ? `${review.likes_count} people liked this review!` : "Was this review helpful?"}</p>
                                        <div className="like-dislike-buttons">
                                            <Button variant="primary" onClick={() => handleLikeDislike(review.id, true, review.author.id)}>
                                                <FaThumbsUp />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleLikeDislike(review.id, false, review.author.id)}>
                                                <FaThumbsDown />
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="no-reviews-text">No reviews yet. Be the first to write one!</p>
                )}
            </Row>


            {/* modal messages for reviews posting twice or liking/dislike own reviews*/}
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