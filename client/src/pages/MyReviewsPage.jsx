import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';


export default function MyReviewsPage () {
    const { user } = useContext(AppContext);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

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
                } else {
                    console.log(data.message)
                }
            })
        }
    }, [user])

    const handleViewDetails = (gameId) => {
        navigate(`/games/${gameId}`);
    };

    if (!user) return <p>Please log in to view your reviews.<br />
    Click <Link to="/login">here</Link> to login!</p>;

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
                            <Button 
                                variant="primary" 
                                onClick={() => handleViewDetails(review.game.id)}
                                style={{margin: "10px"}}
                            >
                                View Game details
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No reviews yet. Start reviewing your favourite games!</p>
            )}
        </Container>
    )
}