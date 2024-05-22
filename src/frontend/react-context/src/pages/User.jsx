import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

export default function User() {
	const { theme } = useThemeContext();

	return (
		<div className={'user ' + theme}>
			<h1>User</h1>
			<h3>TODO: auth context</h3>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
				sit amet lectus lorem. Ut quis commodo odio. Vestibulum vehicula
				ex sem, dignissim lobortis erat feugiat quis. Maecenas blandit
				porttitor faucibus.
			</p>
			<Link to='/home'>Home</Link>
		</div>
	);
}
