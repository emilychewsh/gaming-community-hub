import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import GameDetailsPage from './components/GameDetails'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check if user is logged in when comp mounts

    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:4000/user/account', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data)
        }
    })
    .catch(() => {
      localStorage.removeItem('token');  // Remove token if there’s an error
    })
  }
}, []);

  const handleLogout = () => {
    fetch('http://localhost:4000/user/logout', { method: 'DELETE' })
      .then(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
  };

  const handleSignup = (userData) => {
    localStorage.setItem('token', userData.token)
    setUser(userData)

  };

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token)
    setUser(userData)
  }


  return (
    <>
      <Router>
        <NavBar user={user} handleLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='about' />
          <Route path='signup' element={<SignUpPage onSignup={handleSignup} />} />
          <Route path='login' element={<LoginPage onLogin={handleLogin}/>} />
          <Route path='games' element={<GamePage />} />
          <Route path='games/:gameId' element={<GameDetailsPage user={user} />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
