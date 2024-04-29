import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './consts/routes.jsx';
import Navbar from './components/Navbar.jsx';
import Error from './pages/Error.jsx';
import './App.css';

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
							// COMMENT: usually using React.useContext()
							//	* but for this simple case: dynamically pass props to components rendered within a loop or iteration
							element={React.cloneElement(route.element, {
								isLoggedIn: isLoggedIn,
								toggleIsLoggedIn: () =>
									setIsLoggedIn(!isLoggedIn),
							})}
						/>
					))}
				<Route path='*' element={<Error />} />
			</Routes>
		</>
	);
}
