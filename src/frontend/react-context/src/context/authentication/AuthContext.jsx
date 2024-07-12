import { createContext, useContext, useState, useEffect } from 'react';
import verify from './authentication';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // COMMENT: store username in SESSION-Storage (expires when browser or tab closes)
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('username');
    if (!sessionUser) {
      setIsLoggedIn(false);
      setCurrentUser('');
    } else {
      setIsLoggedIn(true);
      setCurrentUser(sessionUser);
    }
  }, [isLoggedIn]);

  function login(username, password) {
    const isVerified = verify(username, password);
    if (isVerified) {
      sessionStorage.setItem('username', username);
      setIsLoggedIn(true);
      setCurrentUser(username);
    }
  }
  function logout() {
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
