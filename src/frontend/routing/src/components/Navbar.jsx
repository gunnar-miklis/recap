import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ routes, isLoggedIn }) {
  return (
    <nav className='navbar'>
      {routes &&
        routes.map(
          (route) =>
            route.showNavbar && (
              <NavLink
                key={route.name}
                to={route.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {route.name}
              </NavLink>
            ),
        )}
    </nav>
  );
}
