import React, { createContext, useContext, useEffect, useState } from 'react';
import apiService from '../../utils/apiService';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: 'no user' });

  useEffect(() => {
    const storedJWT = sessionStorage.getItem('authToken');
    if (storedJWT) {
      verifyUser();
    }
  }, []);

  // NOTE: login
  async function loginUser(username, password) {
    try {
      const jwt = await apiService.login({ username, password });
      if (Object.keys(jwt)[0] === 'authToken') {
        sessionStorage.setItem('authToken', jwt.authToken);
        verifyUser();
        return { message: `${username} logged in` };
      } else if (Object.keys(jwt)[0] === 'error') {
        logoutUser();
        throw new Error(jwt.error); // re-throw error passed from apiService to be displayed in toast message
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //  NOTE: verify
  async function verifyUser() {
    try {
      const verified = await apiService.verify();

      if (!verified || !Object.keys(verified).length) {
        logoutUser();
        throw new Error('User not verified');
      } else if (Object.keys(verified)[0] === 'error') {
        logoutUser();
        throw new Error(verified.error); // re-throw error passed from apiService to be displayed in toast message
      }

      setCurrentUser({ username: verified.username });
      setIsLoggedIn(true);
      return { message: `${verified.username} is verified` };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // NOTE: logout
  function logoutUser() {
    sessionStorage.removeItem('authToken');
    setCurrentUser({ username: 'no user' });
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, loginUser, verifyUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
