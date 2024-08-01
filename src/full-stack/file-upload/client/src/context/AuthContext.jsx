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

  // NOTE: handle token expiration
  useEffect(() => {
    if (Object.keys(tokenLifetime).length) {
      const lifetime = tokenLifetime.exp - tokenLifetime.iat;
      setNewMessage({
        text: `Session automatically expires after ${(lifetime / 60).toFixed(2)} minutes`,
        type: 'default',
      });
      const timer = setTimeout(() => {
        logoutUser();
        setNewMessage({ text: 'Session expired.', type: 'default' });
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
      const userData = await apiService.verify();
      if (Object.keys(userData)[0] === 'username') {
        const { username, role, bio, avatar, iat, exp } = userData;
        setIsLoggedIn(true);
        setTokenLifetime({ iat, exp });
        setCurrentUser({ username, role, bio, avatar });
        return `'${userData.username}' logged in`;
      } else if (Object.keys(userData)[0] === 'error') throw new Error(userData.error);
      else throw new Error('Unexpexted Error during verification');
    } catch (error) {
      if (error.message.includes('jwt expired')) logoutUser();
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
    <AuthContext.Provider
      value={{ isLoggedIn, currentUser, setCurrentUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
