import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Tab, Tabs, Button} from 'react-bootstrap';
import ReviewTab from "./ReviewTab";
import { AppContext } from '../AppContext';
import './gameDetails.css'; 

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
                    </div>
                </div>

                <Container className="game-details-container">
                    <Tabs defaultActiveKey="details" id="game-details-tabs" className="mb-3">
                        <Tab eventKey="details" title="Game Details">
                            <Row className="game-box">
                                <Col md={5}>
                                    <img src={'/images/'+ game.image_url} alt={game.title} className="game-image" />
                                    <Button variant={isInWishlist ? 'danger' : 'primary'} onClick={handleWishlistToggle}>
                                        {isInWishlist ? 'Remove From Wishlist' : 'Add to Wishlist'}
                                    </Button>
                                    {message && <div className="popup-message">{message}</div>}
                                </Col>
                                <Col md={7}>
                                    <div className="game-description">
                                        <p><strong>{game.description}</strong></p>
                                    </div>

                                    <div className="game-info">
                                        <strong>Price:</strong> {game.genre} <br />
                                        <strong>Price:</strong> ${game.price} <br />
                                        <strong>Rating:</strong> ${game.rating} <br />
                                        <strong>Released:</strong> {new Date(game.release_date).toLocaleDateString()} <br />
                                        <strong>Developer:</strong> {game.developer} <br />
                                        <strong>Publisher:</strong> {game.publisher} <br />
                                        <strong>Platform:</strong> {game.platform} <br />
                                    </div>

                                </Col>
                            </Row>

                    

                            <Row className="trailer-container">
                                <Col md>
                                    <h4>Check out the trailer!</h4>
                                    <iframe
                                        width="50%"
                                        height="315"
                                        src={game.trailer_url}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
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