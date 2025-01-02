import { createContext,useState } from "react";

export const Context = createContext({});

export const AuthProvider = ({ children }) => {
  const [UserName, setUserName] = useState({});
  return (
    <Context.Provider value={{UserName, setUserName}}>
      {children}
    </Context.Provider>
  );
};
