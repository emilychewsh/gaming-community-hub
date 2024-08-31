import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    fetch('/user/logout', { method: 'DELETE' })
      .then(() => setUser(null));
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
    </AppContext.Provider>
  );
};