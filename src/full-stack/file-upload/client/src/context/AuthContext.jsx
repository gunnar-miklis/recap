import { createContext, useContext, useEffect, useState } from 'react';
import apiService from '../utils/apiService.js';
import { useToastContext } from './ToastContext.jsx';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const { setNewMessage } = useToastContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [tokenLifetime, setTokenLifetime] = useState({});

  // NOTE: hanlde token expiration
  useEffect(() => {
    if (Object.keys(tokenLifetime).length) {
      const lifetime = tokenLifetime.exp - tokenLifetime.iat;
      setNewMessage({
        text: `Session automatically expires after ${lifetime / 60} minutes`,
        status: 'default',
      });
      const timer = setTimeout(() => {
        setNewMessage({ text: 'Session expired.', status: 'default' });
        logoutUser();
        clearInterval(timer);
      }, [lifetime * 1000]);
    }
  }, [tokenLifetime, setNewMessage]);

  // NOTE: try to verify use on new page load
  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem('jwt');
    if (storedAuthToken) verifyUser();
    else logoutUser();
  }, []);

  // NOTE: api call for login + store authToken
  async function loginUser(username, password) {
    try {
      const authToken = await apiService.login({ username, password });
      if (Object.keys(authToken)[0] === 'authToken') {
        sessionStorage.setItem('jwt', authToken.authToken);
        return await verifyUser();
      } else if (Object.keys(authToken)[0] === 'error') throw new Error(authToken.error);
      else throw new Error('Unexpexted Error during login');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // NOTE: api call for verification to receive token payload + set current user
  async function verifyUser() {
    try {
      const tokenPayload = await apiService.verify();
      if (Object.keys(tokenPayload)[0] === 'userId') {
        const { userId, username, role } = tokenPayload;
        const { iat, exp } = tokenPayload;
        setIsLoggedIn(true);
        setTokenLifetime({ iat, exp });
        setCurrentUser({ userId, username, role });
        return `'${tokenPayload.username}' logged in`;
      } else if (Object.keys(tokenPayload)[0] === 'error') throw new Error(tokenPayload.error);
      else throw new Error('Unexpexted Error during verification');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // NOTE: reset states and clear storage
  function logoutUser() {
    try {
      const username = currentUser.username;
      sessionStorage.removeItem('jwt');
      setIsLoggedIn(false);
      setCurrentUser({});
      setTokenLifetime({});
      return `'${username}' logged out`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
