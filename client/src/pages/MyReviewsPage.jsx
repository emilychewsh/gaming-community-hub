import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './myReviewsPage.css'


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
            <h1 className="text-center">My Reviews</h1>
            <div className="review-row">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="review-col">
                            <Card key={review.id} className="review-card">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{review.game.title}</Card.Title>
                                    <Card.Text style={{marginBottom: "10px"}}>{review.title}</Card.Text>
                                    <Card.Subtitle className="mb-2 text-muted">{review.content}</Card.Subtitle>
                                    <Card.Footer className="text-muted mt-auto">
                                        Written on {new Date(review.created_at).toLocaleDateString()}
                                        <div className='button'>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => handleViewDetails(review.game.id)}
                                            style={{margin: "10px"}}
                                        >
                                            View Game details
                                        </Button>
                                    </div>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </div>
                ))
            ) : (
                <p>No reviews yet. Start reviewing your favourite games!</p>
            )}
            </div>
        </Container>
    )
}