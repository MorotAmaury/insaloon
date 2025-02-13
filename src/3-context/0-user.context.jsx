import { createContext, useState, useEffect} from "react";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  setEmail: () => null, 
  email: null,
  setAccountOn: () => null, 
  accountOn: null,
  setCurieux: () => null, 
  curieux: null,
  setNombrePrompt: () => null, 
  nombrePrompt: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [accountOn, setAccountOn] = useState(null);
  const [curieux, setCurieux] = useState(null);
  const [finished, setFinished] = useState(true)
  const [nombrePrompt, setNombrePrompt] = useState(0)
  const value = { 
    currentUser, setCurrentUser,
    email, setEmail, 
    accountOn, setAccountOn, 
    nombrePrompt, setNombrePrompt,
    curieux, setCurieux, 
    finished, setFinished};



  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};