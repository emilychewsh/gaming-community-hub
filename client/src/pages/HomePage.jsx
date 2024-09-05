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
      .then(allGames => setGames(allGames.slice(2, 5)))
  }, [])

  const handleNavigate = () => {
    navigate('/games')
  }

  return (
    <div>
    <Carousel>
        {games.map((game, index)=> (
            <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={'images/' + game.image_url}
                    alt={game.title}
                />
                <Carousel.Caption>
                    <h3>{game.title}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
    <Button variant="primary" className="mt-3" onClick={handleNavigate} > Explore More Games </Button>
</div>
  )
}

export default HomePage