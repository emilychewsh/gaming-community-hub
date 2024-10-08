import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './navbar.css'

function NavBar() {
  const { user, handleLogout } = useContext(AppContext)
  const navigate = useNavigate();
  
  const onLogout = () => {
    handleLogout(navigate); // pass navigate to the logout function
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" fixed="top" >
      <Container>
        <Navbar.Brand href="/">
           <img
            src={'/images/quest-logo.png'}
            width="80" 
            height="auto" 
            className="d-inline-block align-top"
            alt="Gaming Hub Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <NavDropdown title="Games" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/games">All Games</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/games?genre=RPG">RPG</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/games?genre=Action">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/games?genre=Racing">Racing</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/games?genre=Battle">Battle</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/games?genre=Anime">Anime</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user ? (
              <>
                <NavDropdown title={`Hi, ${user.first_name.toUpperCase()}!`} id="user-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/myaccount">My Account</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/myreviews">My Reviews</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;