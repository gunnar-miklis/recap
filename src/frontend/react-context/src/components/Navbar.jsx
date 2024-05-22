import React from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

export default function Navbar({ routes }) {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<nav className={'nav ' + theme}>
			<div className={'nav-link-container ' + theme}>
				{routes.map(
					(route) =>
						route.showNavbar && (
							<NavLink
								key={route.name}
								to={route.path}
								className={({ isActive }) =>
									isActive
										? 'nav-link nav-active ' + theme
										: 'nav-link ' + theme
								}
							>
								{route.name.toUpperCase()}
							</NavLink>
						),
				)}
			</div>
			<button
				onClick={() => toggleTheme()}
				className={'theme-switch ' + theme}
			>
				{theme === 'light' ? '☀️' : '🌙'}
			</button>
		</nav>
	);
}
