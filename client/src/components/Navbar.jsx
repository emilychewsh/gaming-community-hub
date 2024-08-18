import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Gaming Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Games" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/games">All Games</NavDropdown.Item>
              <NavDropdown.Item href="/games?genre=RPG">RPG</NavDropdown.Item>
              <NavDropdown.Item href="/games?genre=Action">Action</NavDropdown.Item>
              <NavDropdown.Item href="/games?genre=Racing">Racing</NavDropdown.Item>
              <NavDropdown.Item href="/games?genre=Battle">Battle</NavDropdown.Item>
              <NavDropdown.Item href="/games?genre=Anime">Anime</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;