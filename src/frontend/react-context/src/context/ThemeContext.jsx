import { createContext, useContext, useState } from 'react';

// creates a new context called "ThemeContext"
export const ThemeContext = createContext();

// creates an "alias" / shortcut
export function useThemeContext() {
	return useContext(ThemeContext);
}

// creates a new "wrapper" called "ThemeProvider" that wrapps the app.jsx or specific components
export function ThemeProvider(props) {
	const [theme, setTheme] = useState('light');

	function toggleTheme() {
		if (theme === 'light') setTheme('dark');
		else setTheme('light');
	}
	
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}
