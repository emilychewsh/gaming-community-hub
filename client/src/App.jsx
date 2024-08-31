import React, { useState, useEffect } from 'react'
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
import WishlistPage from './pages/WishlistPage'
import { AppProvider } from './AppContext'

function App() {


  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage/>} >
            <Route index element={<HomePage />} />
            <Route path='about' />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='games' element={<GamePage />} />
            <Route path='games/:gameId' element={<GameDetailsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Route>
          
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
