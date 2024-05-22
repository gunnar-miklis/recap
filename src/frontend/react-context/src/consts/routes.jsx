import About from '../pages/About';
import Home from '../pages/Home';
import User from '../pages/User';

export const routes = [
	{
		name: 'Home',
		path: '/home',
		element: <Home />,
		showNavbar: true,
	},
	{
		name: 'User',
		path: '/user',
		element: <User />,
		showNavbar: true,
	},
	{
		name: 'About',
		path: '/about',
		element: <About />,
		showNavbar: true,
	},
];
