import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function WishlistPage() {
    const { user } = useContext(AppContext)
    const [wishlist, setWishlist] = useState([])

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

    if (!user) return <p>Please log in to view your wishlist.</p>;

    return (
        <div className='row'>
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <Row>
                    {wishlist.map(game => (
                        <Col key={game.id} sm={12} md={6} lg={4} xl={3}>
                            <Card className="mb-4">
                            <Card.Img variant="top" src={game.game.image_url} alt={game.title} />
                                <Card.Body>
                                    <Card.Title>{game.game.title}</Card.Title>
                                    <Card.Text>
                                        {game.game.description}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => handleRemoveFromWishlist(game.game.id)}>
                                        Remove from Wishlist
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