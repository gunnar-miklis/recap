import React from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../context/theme/ThemeContext';
import { useLanguageContext } from '../context/language/LanguageContext';
import { useAuthContext } from '../context/authentication/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext();
  const {
    currentLanguage: lang,
    currentSelection: langSelected,
    switchLanguage,
  } = useLanguageContext();
  const { isLoggedIn } = useAuthContext();

  return (
    <nav className={'nav ' + theme}>
      {/* NOTE: links */}
      <div className={'nav-link-container ' + theme}>
        <NavLink
          to='/home'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-active ' + theme : 'nav-link ' + theme
          }
        >
          {lang.home.title}
        </NavLink>
        <NavLink
          to='/user'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-active ' + theme : 'nav-link ' + theme
          }
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>{isLoggedIn ? '🔓' : '🔒'}</span>
            {lang.user.title}
          </div>
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-active ' + theme : 'nav-link ' + theme
          }
        >
          {lang.about.title}
        </NavLink>
      </div>

      {/* NOTE: control elements */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => switchLanguage('en')}
          className={'lang-switch ' + theme + (langSelected === 'en' ? ' lang-active' : '')}
        >
          EN
        </button>
        {'|'}
        <button
          onClick={() => switchLanguage('de')}
          className={'lang-switch ' + theme + (langSelected === 'de' ? ' lang-active' : '')}
        >
          DE
        </button>
        <button onClick={() => toggleTheme()} className={'theme-switch ' + theme}>
          {theme === 'light' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
