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
import IndexPage from './pages/IndexPage'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check if user is logged in when comp mounts
    fetch('user/account')
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data)
        }
      })
  }, []);

  
  const handleLogout = () => {
    fetch('http://localhost:4000/user/logout', { method: 'DELETE' })
      .then(() => {
        setUser(null)
      })
  };

  const handleSignup = (userData) => {
    setUser(userData)

  };

  const handleLogin = (userData) => {
    setUser(userData)
  }


  return (
    <>
      <Router>
        {/* <NavBar user={user} handleLogout={handleLogout}/> */}
        <Routes>
          <Route path='/' element={<IndexPage user={user} handleLogout={handleLogout}/>} >
            <Route index element={<HomePage />} />
            <Route path='about' />
            <Route path='signup' element={<SignUpPage onSignup={handleSignup} />} />
            <Route path='login' element={<LoginPage onLogin={handleLogin}/>} />
            <Route path='games' element={<GamePage user={user}/>} />
            <Route path='games/:gameId' element={<GameDetailsPage user={user} />} />
          </Route>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
