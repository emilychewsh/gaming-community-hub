import { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Card, Button, Container, Form, InputGroup, Modal } from 'react-bootstrap'
import { AppContext } from '../AppContext';
import './gamePage.css'

export default function GamePage() {
    const [gameData, setGameData] = useState([]); //list of games fetched from the server
    const [filteredGames, setFilteredGames] = useState([]); //based on search or genre 
    const [searchGame, setSearchGame] = useState("")
    const [selectedGenre, setSelectedGenre] = useState(""); // to store the selected genre
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [newGame, setNewGame] = useState({
        title: "",
        genre: "",
        price: "",
        description: "",
        rating: "",
        platform: "",
        trailer_url: "",
        release_date: "",
        developer: "",
        publisher: "",
        image_url: "",
    })
    const genreOptions = ["RPG", "Action", "Racing", "Battle", "Anime"];


    // function to parse query parameters from URL
    const getQueryParams = (search) => {
        return new URLSearchParams(search);
    }

    // fetch game data from API
    useEffect(() => {
        fetch('/games')
        .then((resp) => resp.json())
        .then((data) => {
            setGameData(data);
            filterGames(data); // set filteredGames based on initial fetch
            console.log(data)
        })
        .catch((error) => console.error("Error with fetching games:", error));
    }, []);


    //reruns filterGames fx every time location.search, gameData, searchGame changes
    useEffect(() => {
        filterGames(gameData)
    }, [location.search, gameData, searchGame])


    const filterGames = (games) => {
        const params = getQueryParams(location.search)
        const genre = params.get('genre')
        let filtered = games

        if (genre) {
            setSelectedGenre(genre)
            filtered = filtered.filter(game => game.genre.toLowerCase() === genre.toLowerCase());
        } else {
            setSelectedGenre(""); 
        }
        if (searchGame) {
            filtered = filtered.filter(game => game.title.toLowerCase().includes(searchGame.toLowerCase()));
        }
        setFilteredGames(filtered);
    }

    const handleSearchChange = (e) => {
        setSearchGame(e.target.value);
    };

    // Navigate to game details page for 'view details' button
    const handleGameClick = (gameId) => {
        navigate(`/games/${gameId}`);
    }

    //handles img file upload
    const handleFileChange = (e) => {
        setNewGame({ ...newGame, image: e.target.files[0] });
    };

    const handleChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(newGame).forEach((key) => {
            formData.append(key, newGame[key]);
        });

        fetch('/admin/add_game', {
            method: "POST",
            body: formData,
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setGameData([...gameData, data]); //adds to existing games
            setShowModal(false);
            setNewGame({ //resets newGame state after submission
                title: "",
                genre: "",
                price: "",
                description: "",
                rating: "",
                platform: "",
                trailer_url: "",
                release_date: "",
                developer: "",
                publisher: "",
                image_url: "",
            });
        })
    };

    return (
        
        <Container className="game-container">
            {selectedGenre && <h2>Game Genre - {selectedGenre.toUpperCase()}</h2>}
            
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search for games..."
                    aria-label="Search games"
                    value={searchGame}
                    onChange={handleSearchChange}
                />
            </InputGroup>
            {user && user.is_admin && (
                <Button variant="danger" style={{ marginBottom: '1rem' }} onClick={() => setShowModal(true)}>Add Game</Button>
            )}
            <div className="row">
                {filteredGames.length > 0 ? (
                    filteredGames.map(game => (
                        <div key={game.id} className="col-xl-3 col-lg-4 col-md-6 mb-5">
                            <Card 
                                className="game-card d-flex flex-column justify-content-between"
                                style={{ width: '18rem'}}
                                onClick={() => handleGameClick(game.id)}
                            >
                                <Card.Img variant="top" src={'images/'+ game.image_url} alt={game.title}/>
                                <Card.Body>
                                    <Card.Title>{game.title}</Card.Title>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleGameClick(game.id)} 
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="no-results-message">
                        <p>No games found. Try a different search or genre!</p>
                    </div>
                )}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newGame.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                                <Form.Select
                                    name="genre"
                                    value={newGame.genre}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a genre</option>
                                    {genreOptions.map(genre => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={newGame.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={newGame.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={newGame.rating}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPlatform">
                            <Form.Label>Platform</Form.Label>
                            <Form.Control
                                type="text"
                                name="platform"
                                value={newGame.platform}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTrailerUrl">
                            <Form.Label>Trailer URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="trailer_url"
                                value={newGame.trailer_url}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formReleaseDate">
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="release_date"
                                value={newGame.release_date}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDeveloper">
                            <Form.Label>Developer</Form.Label>
                            <Form.Control
                                type="text"
                                name="developer"
                                value={newGame.developer}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPublisher">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisher"
                                value={newGame.publisher}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage">
                            <Form.Label>Game Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}