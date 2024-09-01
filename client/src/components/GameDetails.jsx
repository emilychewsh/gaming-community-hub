import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import ReviewTab from "./ReviewTab";
import { AppContext } from '../AppContext';

export default function GameDetailsPage() {
    const { gameId } = useParams(); //get gameId from URL params
    const [game, setGame] = useState(null);
    const { user } = useContext(AppContext);
    const [message, setMessage] = useState('')
    const [isInWishlist, setIsInWishlist] = useState(false)

    useEffect(() => {
        fetch(`/games/${gameId}`)
        .then((resp) => resp.json())
        .then((data) => {
            setGame(data)
        })
        .catch((error) => console.error("Error fetching game details:", error))

        if (user) {
            fetch(`/favourites/${gameId}`)
            .then(resp => resp.json())
            .then(data => {
                if (!data.error) {
                    setIsInWishlist(true)
                }
            })
        }
    }, [gameId, user])


    //Handle wishlist toggle 
    const handleWishlistToggle = () => {
        if (!user) {
            alert("Please log in to add to your wishlist.");
            return;
        }

        const url = isInWishlist ? '/favourites/remove' : '/favourites/add'
        const method = isInWishlist ? 'DELETE' : 'POST'

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_id: gameId })
        })
            .then(resp => resp.json())
            .then(data => {
                setMessage(data.message)
                setIsInWishlist(!isInWishlist)
                setTimeout(() => setMessage(''), 3000)
            })
            .catch(error => console.error(`Error ${isInWishlist ? 'removing from' : 'adding to'} wishlist:`, error))
    }


    if (!game) return <div>Loading game details...</div>

    return (
        <div>
            <div className="game-hero">
                    <div className="overlay">
                        <h1>{game.title}</h1>
                        <p>{game.genre}</p>
                        <button onClick={handleWishlistToggle}>
                            {isInWishlist ? 'On Wishlist' : 'Add to Wishlist'}
                        </button>
                        {message && <div className="popup-message">{message}</div>}
                    </div>
                </div>

                <Container className="mt-5">
                    <Tabs defaultActiveKey="details" id="game-details-tabs" className="mb-3">
                        <Tab eventKey="details" title="Game Details">
                            <Row>
                                <Col md>
                                    <h2>Description</h2>
                                    <p>{game.description}</p>
                                </Col>
                            </Row>

                            <Row>
                                <Col md>
                                    <h3>Game Info</h3>
                                    <ul>
                                        <li><strong>Price:</strong> ${game.price}</li>
                                        <li><strong>Rating:</strong> ${game.rating}</li>
                                        <li><strong>Released:</strong> {new Date(game.release_date).toLocaleDateString()}</li>
                                        <li><strong>Developer:</strong> {game.developer}</li>
                                        <li><strong>Publisher:</strong> {game.publisher}</li>
                                        <li><strong>Platform:</strong> {game.platform}</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews">
                            <ReviewTab />
                        </Tab>
                    </Tabs>
            </Container>

        </div>
    )

}