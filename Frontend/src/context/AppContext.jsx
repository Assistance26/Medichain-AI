import { createContext, useState, useContext } from "react";

const AppContext = createContext();

  export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example global state

 return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
 };

// // Custom hook for easier access
 export const useAppContext = () => useContext(AppContext);
