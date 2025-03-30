import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleSetUser = (newUser) => setUser(newUser);
  const handleRemoveUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, handleSetUser, handleRemoveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Corrected: Use a custom hook to avoid direct `useContext(AuthContext)`
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
