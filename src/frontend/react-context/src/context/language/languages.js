function formatDayPeriod(lang) {
	const date = new Date();
	const hours = date.getHours();

	if (lang === 'en') {
		if (hours >= 4 && hours < 11) return 'Good Morning';
		if (hours >= 11 && hours < 14) return 'Good Day';
		if (hours >= 14 && hours < 18) return 'Good Afternoon';
		if (hours >= 18 && hours < 22) return 'Good Evening';
		if (hours >= 22 || hours < 4) return 'Good Night';
	}
	if (lang === 'de') {
		if (hours >= 4 && hours < 11) return 'Guten Morgen';
		if (hours >= 11 && hours < 14) return 'Guten Tage';
		if (hours >= 14 && hours < 18) return 'Guten Nachmittag';
		if (hours >= 18 && hours < 22) return 'Guten Abend';
		if (hours >= 22 || hours < 4) return 'Gute Nacht';
	}
}

export const languages = {
	en: {
		home: {
			title: 'Home',
			heading: 'React Context API',
			text: 'The React Context API simplifies state management by providing a way to share data like Theme, Language, and Authentication across your app without prop drilling. Easily manage global states, enabling consistent theming, seamless language switching, and secure user authentication with minimal setup and maximum efficiency.',
			currentUser: 'Current User: ',
		},
		about: {
			title: 'About',
			heading: 'Simplifying Language Switching in React with Context API',
			text: {
				p1: 'Switching between languages in a React application can be a bit tricky, but the React Context API makes it much easier. The Context API allows you to share data across your app without having to pass props down manually at every level. To switch languages, you can create a LanguageContext that holds the current language and a function to update it. This way, any component in your app can access and change the language without prop drilling.',
				p2: 'To set this up, start by creating a context with React.createContext(). Then, make a provider component that uses this context to store the current language and the function to change it. Wrap your main application component with this provider. Inside your components, use useContext(LanguageContext) to get the current language and the function to switch languages. This method ensures that your language data is centralized and easy to manage. With this setup, when a user selects a different language, your entire app can respond seamlessly, providing a smooth and consistent user experience.',
			},
		},
		user: {
			title: 'User',
			heading: 'welcome back!',
			text: "The React Context API's Auth Context simplifies user authentication by managing login state globally. Effortlessly handle user sessions, permissions, and secure access across your app without repetitive prop drilling, ensuring a smooth and secure user experience.",
		},
		dayPeriod: formatDayPeriod('en'),
	},
	de: {
		home: {
			title: 'Startseite',
			heading: 'React Context API',
			text: 'Die React Context API vereinfacht die Zustandsverwaltung, indem sie eine Möglichkeit bietet, Daten wie Theme, Sprache und Authentifizierung in der gesamten App ohne Prop Drilling zu teilen. Verwalten Sie ganz einfach globale Zustände und ermöglichen Sie ein konsistentes Theme, einen nahtlosen Sprachwechsel und eine sichere Benutzerauthentifizierung mit minimaler Einrichtung und maximaler Effizienz.',
			currentUser: 'Angemeldeter Nutzer: ',
		},
		about: {
			title: 'Über',
			heading: 'Vereinfachte Sprachumschaltung in React mit Context API',
			text: {
				p1: 'Der Wechsel zwischen Sprachen in einer React-Anwendung kann etwas schwierig sein, aber die React Context API macht es viel einfacher. Mit der Context-API können Sie Daten in Ihrer Anwendung gemeinsam nutzen, ohne dass Sie Props auf jeder Ebene manuell weitergeben müssen. Um die Sprache zu wechseln, können Sie einen LanguageContext erstellen, der die aktuelle Sprache und eine Funktion zu deren Aktualisierung enthält. Auf diese Weise kann jede Komponente in Ihrer Anwendung auf die Sprache zugreifen und sie ändern, ohne Props eingeben zu müssen.',
				p2: 'Um dies einzurichten, erstellen Sie zunächst einen Kontext mit React.createContext(). Dann erstellen Sie eine Provider-Komponente, die diesen Kontext verwendet, um die aktuelle Sprache und die Funktion zum Ändern zu speichern. Umhüllen Sie Ihre Hauptanwendungskomponente mit diesem Anbieter. Innerhalb Ihrer Komponenten verwenden Sie useContext(LanguageContext), um die aktuelle Sprache und die Funktion zum Umschalten der Sprache zu erhalten. Diese Methode stellt sicher, dass Ihre Sprachdaten zentralisiert und einfach zu verwalten sind. Mit dieser Einrichtung kann Ihre gesamte Anwendung nahtlos reagieren, wenn ein Benutzer eine andere Sprache auswählt, und so eine reibungslose und konsistente Benutzererfahrung bieten.',
			},
		},
		user: {
			title: 'Benutzer',
			heading: 'willkommen zurück!',
			text: 'Der Auth-Kontext von React Context API vereinfacht die Benutzerauthentifizierung durch die globale Verwaltung des Anmeldestatus. Verwalten Sie mühelos Benutzersitzungen, Berechtigungen und sicheren Zugriff in Ihrer gesamten App ohne Prop Drilling, um ein reibungsloses und sicheres Benutzererlebnis zu gewährleisten.',
		},
		dayPeriod: formatDayPeriod('de'),
	},
};
