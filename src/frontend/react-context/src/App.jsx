import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { routes } from './consts/routes';
import { useThemeContext } from './context/ThemeContext';

function App() {
	const { theme } = useThemeContext();

	return (
		<div className={'app ' + theme}>
			<div className={'app-container'}>
				<Navbar routes={routes} />
				<Routes>
					{routes.map((route) => (
						<Route
							key={route.name}
							path={route.path}
							element={route.element}
						/>
					))}
				</Routes>
			</div>
		</div>
	);
}

export default App;
