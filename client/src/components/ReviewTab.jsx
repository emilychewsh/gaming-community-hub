import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ReviewTab({ user }) {
    const {gameId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ content: '', rating: 0});

    useEffect(() => {
        fetch(`http://localhost:4000/games/${gameId}/reviews`)
        .then((resp) => resp.json())
        .then((data) => setReviews(data.reviews))
        .catch((error) => console.error("Error with fetching game reviews:", error))
    }, [gameId])

    //Handle posting a review
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user) {
            alert("Please log in to write a review.")
            return
        }

        fetch('http://localhost:4000/reviews/add', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`  
            },
            body: JSON.stringify({ 
                ...newReview,
                game_id: gameId
            }),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to submit review.")
            }
            return resp.json()
        })
        .then((data) => {
            setReviews([...reviews, data.review]);
            setNewReview({ content: '', rating: 0 })
        })
        .catch((error) => console.error("Error with posting review:", error))
    }

    return (
        <div>
            <h3>Reviews</h3>
            <div>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id}>
                            <p><strong>{review.author.username || review.author}</strong>: {review.content} (Rating: {review.rating})</p>
                            <p><em>Posted on: {new Date(review.created_at).toLocaleDateString()}</em></p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to write one!</p>
                )}
            </div>
            {user && (

                <Form onSubmit={handleSubmit}>
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