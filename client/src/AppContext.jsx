import React, { createContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  // fetch user data when the app mounts
  useEffect(() => {
    fetch('/user/account')
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        }
      });
  }, []);

  const handleLogout = (navigate) => {
    fetch('/user/logout', { method: 'DELETE' })
      .then(() => {
        setUser(null)
        setModalMessage('You have successfully logged out!');
        setShowModal(true)
        setTimeout(() => {
          setShowModal(false);
          navigate('/games'); // navigate to /games after 2 seconds
        }, 2000);
      });
    
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  return (
    <AppContext.Provider value={{ user, handleLogout, handleLogin, handleSignup }}>
      {children}

      {/* Modal message for loggin out */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logged Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </AppContext.Provider>
  );
};