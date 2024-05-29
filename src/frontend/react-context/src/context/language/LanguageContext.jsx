import { createContext, useContext, useState, useEffect } from 'react';
import { languages } from './languages';

const LanguageContext = createContext();

export function useLanguageContext() {
	return useContext(LanguageContext);
}

export default function LanguageProvider(props) {
	const [currentSelection, setCurrentSelection] = useState('en');
	const [currentLanguage, setCurrentLanguage] = useState(
		languages[currentSelection],
	);

	useEffect(() => {
		const userLanguage = localStorage.getItem('userLanguage');

		if (!userLanguage) {
			setCurrentSelection('en');
			setCurrentLanguage(languages['en']);
		} else {
			setCurrentSelection(userLanguage);
			setCurrentLanguage(languages[userLanguage]);
		}
	}, [currentSelection]);

	function switchLanguage(lang) {
		localStorage.setItem('userLanguage', lang);
		setCurrentSelection(lang);
		setCurrentLanguage(languages[lang]);
	}
	return (
		<LanguageContext.Provider
			value={{ currentSelection, currentLanguage, switchLanguage }}
		>
			{props.children}
		</LanguageContext.Provider>
	);
}
