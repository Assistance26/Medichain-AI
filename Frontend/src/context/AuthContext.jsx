import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the user
  const handleSetUser = (newUser) => {
    setUser(newUser);
  };

  // Function to remove the user (log out)
  const handleRemoveUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleSetUser, handleRemoveUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};