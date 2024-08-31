import { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { AppContext } from '../AppContext';

export default function GamePage() {
    const [gameData, setGameData] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AppContext);

    // Function to parse query parameters from URL
    const getQueryParams = (search) => {
        return new URLSearchParams(search);
    }

    // Fetch game data from API
    useEffect(() => {
        fetch('http://localhost:4000/games')
        .then((resp) => resp.json())
        .then((data) => {
            setGameData(data);
            setFilteredGames(data); // Initially show all games
            // console.log(data)
        })
        .catch((error) => console.error("Error with fetching games:", error));
    }, []);

    // Handle genre filtering based on query parameter
    useEffect(() => {
        const params = getQueryParams(location.search);
        const genre = params.get('genre');
        
        if (genre) {
            const filtered = gameData.filter(game => game.genre === genre);
            setFilteredGames(filtered);
        } else {
            setFilteredGames(gameData);
        }
    }, [location.search, gameData]);

    // Navigate to game details page
    const handleGameClick = (gameId) => {
        navigate(`/games/${gameId}`);
    }

    return (
        <div className="row">
            {filteredGames.map(game=> (
                <div key={game.id} className="col-xl-3 col-lg-4 col-md-6">
                    <Card 
                        bg="light"
                        style={{ width: '18rem', cursor: 'pointer' }}
                        border="dark"
                        onClick={() => handleGameClick(game.id)}>
                        <Card.Img variant="top" src={game.image_url} alt={game.title} />
                        <Card.Body>
                            <Card.Title>{game.title}</Card.Title>
                            <Card.Text>{game.description}</Card.Text>
                            <Button variant="primary" onClick={() => handleGameClick(game.id)}>View Details</Button>
                        </Card.Body>
                        </Card>
                </div>
            ))}

        </div>

    );
}