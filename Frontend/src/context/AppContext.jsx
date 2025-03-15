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
