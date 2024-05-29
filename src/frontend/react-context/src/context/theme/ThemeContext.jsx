import { createContext, useContext, useState, useEffect } from 'react';
import './theme.css';

// creates a new context called "ThemeContext"
const ThemeContext = createContext();

// creates an "alias" / shortcut
export function useThemeContext() {
	return useContext(ThemeContext);
}

// creates a new "wrapper" called "ThemeProvider" that wrapps the app.jsx or specific components
export default function ThemeProvider(props) {
	const [theme, setTheme] = useState('light');

	// COMMENT: store user prefs in LOCAL-Storage (no expire)
	useEffect(() => {
		const userTheme = localStorage.getItem('userTheme');

		if (!userTheme) setTheme('light');
		else setTheme(userTheme);
	}, [theme]);

	function toggleTheme() {
		if (theme === 'light') {
			localStorage.setItem('userTheme', 'dark');
			setTheme('dark');
		} else {
			localStorage.setItem('userTheme', 'light');
			setTheme('light');
		}
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}
