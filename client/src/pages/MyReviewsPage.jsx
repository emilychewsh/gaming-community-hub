import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { AppContext } from '../AppContext';


export default function MyReviewsPage () {
    const { user } = useContext(AppContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('/reviews/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.reviews) {
                    setReviews(data.reviews)
                    console.log(data.reviews)
                } else {
                    console.log(data.message)
                }
            })
        }
    }, [user])

    return (
        <Container>
            <h1>My Reviews</h1>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <Card key={review.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{review.game.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{review.title}</Card.Subtitle>
                            <Card.Text>{review.content}</Card.Text>
                            <Card.Footer className="text-muted">
                                Written on {new Date(review.created_at).toLocaleDateString()}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No reviews yet. Start reviewing your favorite games!</p>
            )}
        </Container>
    )
}