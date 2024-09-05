import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
    const { user } = useContext(AppContext)
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch('/favourites')
                .then(resp => resp.json())
                .then(data => {
                    // console.log(data.favourites) //check if data was sent 
                    setWishlist(data.favourites)
                })
        }
    }, [user]);

    const handleRemoveFromWishlist = (gameId) => {
        fetch('/favourites/remove', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_id: gameId })
        })
            .then(resp => resp.json())
            .then(() => {
                setWishlist(wishlist.filter((game)=> game.game.id !== gameId))
            })

    }

    const handleNavigate = (gameId) => {
        navigate(`/games/${gameId}`)
    }

    if (!user) return <p>Please log in to view your wishlist.<br />
    Click <Link to="/login">here</Link> to login!</p>;

    return (
        <div className='row'>
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <Row className="g-4">
                    {wishlist.map(game => (
                        <Col key={game.id} sm={12} md={6} lg={4} xl={3}>
                            <Card className="mb-4" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={'images/' + game.game.image_url} alt={game.title} />
                                <Card.Body>
                                    <Card.Title>{game.game.title}</Card.Title>
                                    <Button variant="danger" onClick={() => handleRemoveFromWishlist(game.game.id)}>
                                        Remove from Wishlist
                                    </Button>
                                    <Button variant="primary" onClick={()=> handleNavigate(game.game.id)} style={{ marginTop: '10px' }} >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
            )}
        </div>
    )
}