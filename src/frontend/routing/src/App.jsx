import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './consts/routes.jsx';
import Navbar from './components/Navbar.jsx';
import Error from './pages/Error.jsx';
import './App.css';

// COMMENT: Prop Drilling vs React.useContext()
//	* "prop drilling": passing down props several levels
//	* for a simple project like this: dynamically pass props to components
//	* "useContext": is react's built-in state management solution to pass data deeply to any component
//	* considered sharing data "global". usecases: (light/dark) theme, (en/de) language, (user sign in/out) authentication

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar routes={routes} />
      <Routes>
        {routes &&
          routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              // COMMENT: React.cloneElement() renders each given element (route.element <About/>) new (create a new element) but with new attributes (isLoggedIn, toggleIsLoggedIn)
              element={React.cloneElement(route.element, {
                isLoggedIn: isLoggedIn,
                toggleIsLoggedIn: () => setIsLoggedIn(!isLoggedIn),
              })}
            />
          ))}
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}
