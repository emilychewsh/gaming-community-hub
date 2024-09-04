import { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Card, Button, Container, Form, InputGroup } from 'react-bootstrap'
import { AppContext } from '../AppContext';
import './gamePage.css'

export default function GamePage() {
    const [gameData, setGameData] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchGame, setSearchGame] = useState("")
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AppContext);

    // Function to parse query parameters from URL
    const getQueryParams = (search) => {
        return new URLSearchParams(search);
    }

    // Fetch game data from API
    useEffect(() => {
        fetch('/games')
        .then((resp) => resp.json())
        .then((data) => {
            setGameData(data);
            filterGames(data); // Set filteredGames based on initial fetch
            // console.log(data)
        })
        .catch((error) => console.error("Error with fetching games:", error));
    }, []);


    useEffect(() => {
        filterGames(gameData)
    }, [location.search, gameData, searchGame])


    const filterGames = (games) => {
        const params = getQueryParams(location.search)
        const genre = params.get('genre')
        let filtered = games

        if (genre) {
            filtered = filtered.filter(game => game.genre === genre);
        }
        if (searchGame) {
            filtered = filtered.filter(game => game.title.toLowerCase().includes(searchGame.toLowerCase()));
        }
        setFilteredGames(filtered);
    }

    // Navigate to game details page for 'view details' button
    const handleGameClick = (gameId) => {
        navigate(`/games/${gameId}`);
    }

    const handleSearchChange = (e) => {
        setSearchGame(e.target.value);
    };

    return (
        
        <Container className="game-container">
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search for games..."
                    aria-label="Search games"
                    value={searchGame}
                    onChange={handleSearchChange}
                />
            </InputGroup>
            <div className="row">
                {filteredGames.map(game=> (
                    <div key={game.id} className="col-xl-3 col-lg-4 col-md-6 mb-5">
                        <Card 
                        className="game-card"
                        style={{ width: '18rem'}}
                        onClick={() => handleGameClick(game.id)}>
                            <Card.Img variant="top" src={game.image_url} alt={game.title}/>
                            <Card.Body>
                                <Card.Title>{game.title}</Card.Title>
                                <Button variant="primary" onClick={() => handleGameClick(game.id)} style={{ marginTop: '1rem' }}>View Details</Button>
                            </Card.Body>
                            </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
}