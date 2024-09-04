import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { AppContext } from '../AppContext';

export default function ReviewTab() {
    const {gameId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ title: '', content: '', rating: 0});
    const { user } = useContext(AppContext);

    useEffect(() => {
        fetch(`/games/${gameId}/reviews`)
        .then((resp) => resp.json())
        .then((data) => setReviews(data.reviews))
        .catch((error) => console.error("Error with fetching game reviews:", error))
    }, [gameId])

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

    const handleLikeDislike = (reviewId, isLike) => {
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
        <div>
            <Row>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Col key={review.id} md={6} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{review.title}</Card.Title>
                                    <Card.Text>{review.content}</Card.Text>
                                    <Card.Footer className="text-muted">
                                        Written by {review.author.username || review.author} on {new Date(review.created_at).toLocaleDateString()}
                                    </Card.Footer>
                                    <Card.Footer>
                                        <Button variant="link" onClick={() => handleLikeDislike(review.id, true)}>
                                            <FaThumbsUp /> {review.likes_count} liked this review
                                        </Button>
                                        <Button variant="link" onClick={() => handleLikeDislike(review.id, false)}>
                                            <FaThumbsDown />
                                        </Button>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to write one!</p>
                )}
            </Row>

            {user && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Title">
                    <Form.Label>Review Title:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter a title for your review" 
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Content">
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

                    <Form.Group className="mb-3" controlId="rating">
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
        </div>
    )

}