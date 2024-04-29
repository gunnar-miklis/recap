import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import User from '../pages/User.jsx';
import fakeUserData from '../db/fakeUserData.json';

export const routes = [
	{
		name: 'Home',
		path: '/',
		element: <Home />,
	},
	{
		name: 'About',
		path: '/about',
		element: <About />,
	},
	{
		name: 'User',
		path: '/user',
		element: <User fakeUserData={fakeUserData} />,
	},
];
