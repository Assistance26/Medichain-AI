<<<<<<< HEAD
import React,{createContext, useState} from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {
    const [user, setUser] = useState();
  return <GlobalContext.Provider value={
    {user, setUser}
  }>
    {children}
  </GlobalContext.Provider>
}
=======
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
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
