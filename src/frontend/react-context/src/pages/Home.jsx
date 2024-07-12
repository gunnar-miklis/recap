import React from 'react';
import { useThemeContext } from '../context/theme/ThemeContext';
import { useLanguageContext } from '../context/language/LanguageContext';
import { useAuthContext } from '../context/authentication/AuthContext';

export default function Home() {
  const { theme } = useThemeContext();
  const { currentLanguage: lang } = useLanguageContext();
  const { isLoggedIn, currentUser } = useAuthContext();

  return (
    <div className={'home ' + theme}>
      <h1>{lang.home.title}</h1>
      <h3>{lang.home.heading}</h3>
      <p>{lang.home.text}</p>

      {isLoggedIn && (
        <h3>
          {lang.home.currentUser}
          <a href='/user'>{currentUser.toUpperCase()}</a>
        </h3>
      )}
    </div>
  );
}
