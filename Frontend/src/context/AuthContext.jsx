// import React, { createContext, useState, useContext } from 'react';

// // Create a context for the user
// const UserContext = createContext();

// // Create a provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Function to set the user
//   const handleSetUser = (newUser) => {
//     setUser(newUser);
//   };

//   // Function to remove the user (log out)
//   const handleRemoveUser = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, handleSetUser, handleRemoveUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the UserContext
// export const useUser = () => {
//   return useContext(UserContext);
// };






import React, { createContext, useState, useContext, useEffect } from "react";

// ✅ Explicitly export AuthContext
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Sync user state with localStorage changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to set user (login)
  const handleSetUser = (newUser) => {
    setUser(newUser);
  };

  // Function to remove user (logout)
  const handleRemoveUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleSetUser, handleRemoveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
