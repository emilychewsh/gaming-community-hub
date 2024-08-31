import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import ReviewTab from "./ReviewTab";

export default function GameDetailsPage({user}) {
    const { gameId } = useParams(); //get gameId from URL params
    const [game, setGame] = useState(null);
    const [activeTab, setActiveTab] = useState('details') //this state manages the active tab between details and reviews

    useEffect(() => {
        fetch(`http://localhost:4000/games/${gameId}`)
        .then((resp) => resp.json())
        .then((data) => {
            setGame(data)
        })
        .catch((error) => console.error("Error fetching game details:", error))
    }, [gameId])

    if (!game) return <div>Loading game details...</div>

    return (
        <div>
            <div className="game-hero">
                    <div className="overlay">
                        <h1>{game.title}</h1>
                        <p>{game.genre}</p>
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
                            <ReviewTab user={user} gameId = {gameId} />
                        </Tab>
                    </Tabs>
            </Container>

        </div>
    )

}