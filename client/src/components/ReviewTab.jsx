import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReviewTab({ user }) {
    const {gameId} = useParams();
    const [review, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ content: '', rating: 0});

    useEffect(() => {
        fetch(`http://localhost:4000/games/reviews`)
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
        .then((resp) => resp.json())
            .then((data) => {
                setReviews([...review, data]);
                setNewReview({ content: '', rating: 0 })
            })
            .catch((error) => console.error("Error with posting review:", error))
    }

    return (
        <div>
            <h3>Reviews</h3>
            <div>
                {review.map(review => (
                    <div key={review.id}>
                        <p><strong>{review.author}:</strong> {review.content} (Rating: {review.rating})</p>
                    </div>
                ))}
            </div>
            {user && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newReview.content}
                        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        min="1"
                        max="5"
                        required
                    />
                    <button type="submit">Submit Review</button>
                </form>
            )}
            {!user && <p>Please log in to write a review. <br />
            No account yet? Register a user account here</p>}
        </div>
    )

}