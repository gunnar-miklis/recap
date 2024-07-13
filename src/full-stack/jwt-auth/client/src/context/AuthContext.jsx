import React, { createContext, useContext, useState } from 'react'
import Axios from 'axios';
const API_URL = 'http://localhost:3000';


const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider( {children} ) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  	const [currentUser, setCurrentUser] = useState({username: 'no user'});

	function loginUser() {
		sessionStorage.setItem();
		setCurrentUser({})
		setIsLoggedIn(true)
	}
	function logoutUser() {
		sessionStorage.removeItem();
		setIsLoggedIn(false)
	}
  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
