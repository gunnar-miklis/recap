import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

export default function Home() {
	const { theme } = useThemeContext();

	return (
		<div className={'home ' + theme}>
			<h1>Home</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
				sit amet lectus lorem. Ut quis commodo odio. Vestibulum vehicula
				ex sem, dignissim lobortis erat feugiat quis. Maecenas blandit
				porttitor faucibus. Vivamus blandit vel nunc sed aliquet. Nunc
				pretium est felis, in cursus mi convallis a. Nulla lobortis
				ornare lorem in rhoncus. Nam eros nunc, iaculis id nibh eget,
				laoreet suscipit libero. In rhoncus nibh lacus, in consectetur
				felis egestas a. Donec vulputate rutrum vestibulum. Aliquam in
				pretium augue. Curabitur malesuada ante volutpat aliquam
				interdum.
			</p>
		</div>
	);
}
