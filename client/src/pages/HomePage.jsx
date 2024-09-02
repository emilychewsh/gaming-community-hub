import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./homePage.css"


function HomePage() {
  const [games, setGames] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      fetch('/games')  //fetch games
      .then(response => response.json())
      .then(allGames => setGames(allGames.slice(1, 4)))
  }, [])

  const handleNavigate = () => {
    navigate('/games')
  }

  return (
    <div>
    <Carousel fade>
        {games.map((game, index)=> (
            <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={game.image_url}
                    alt={game.title}
                />
                <Carousel.Caption>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
    <Button variant="primary" className="mt-3" onClick={handleNavigate} > Explore More Games </Button>
</div>
  )
}

export default HomePage