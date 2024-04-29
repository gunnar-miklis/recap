import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ routes, isLoggedIn }) {
	return (
		<nav className='navbar'>
			{routes &&
				routes.map((route) => (
					<NavLink
						key={route.name}
						to={route.path}
						className={({ isActive }) =>
							isActive ? 'selected' : ''
						}
					>
						{route.name}
					</NavLink>
				))}
		</nav>
	);
}
