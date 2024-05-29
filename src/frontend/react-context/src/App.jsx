import { Routes, Route } from 'react-router-dom';
import { useThemeContext } from './context/theme/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import User from './pages/User';
import About from './pages/About';

function App() {
	const { theme } = useThemeContext();

	return (
		<div className={'app ' + theme}>
			<div className={'app-container'}>
				<Navbar />
				<Routes>
					<Route path='/home' element={<Home />} />
					<Route path='/user' element={<User />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
