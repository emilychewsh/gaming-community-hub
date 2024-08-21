import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import GameDetailsPage from './components/GameDetails'

function App() {
  const [user, setUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check user authentication status when the app loads
    fetch('http://localhost:4000/user/account', {
      method: 'GET',
      credentials: 'include', // Ensure credentials are sent with the request
    })
      .then((response) => {
        if (response.ok) {
          setUser(true);
        } else {
          setUser(false);
        }
      })
      .catch((err) => setError('Failed to check authentication status.'))
  }, [])


  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='about' />
          <Route path='signup' />
          <Route path='games' element={<GamePage />} />
          <Route path='games/:gameId' element={<GameDetailsPage user={user} />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
