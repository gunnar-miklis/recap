import { useState } from 'react';
import { useThemeContext } from '../context/theme/ThemeContext';
import { useLanguageContext } from '../context/language/LanguageContext';
import { useAuthContext } from '../context/authentication/AuthContext';

export default function User() {
  const { theme } = useThemeContext();
  const { currentLanguage: lang } = useLanguageContext();
  const { isLoggedIn, currentUser, login, logout } = useAuthContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    login(username, password);
  }

  // NOTE: show form when not logged in
  if (!isLoggedIn)
    return (
      <div className={'user ' + theme}>
        <h1>{lang.user.title}</h1>
        <form onSubmit={handleSubmit} className={'form ' + theme}>
          <div className={'input-wrapper'}>
            <label hidden>Username</label>
            <input
              name='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username: test'
              className={'input ' + theme}
            />
          </div>
          <div className={'input-wrapper'}>
            <label hidden>Password</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password: 123'
              className={'input ' + theme}
            />
          </div>
          <button type='submit' className={'button ' + theme}>
            Login
          </button>
        </form>
      </div>
    );

  // NOTE: show this view, when logged in
  return (
    <div className={'user ' + theme}>
      <h1>{lang.user.title}</h1>
      <h3>
        {lang.dayPeriod}, {currentUser.toUpperCase()}!
      </h3>
      <p>{lang.user.text}</p>
      <button onClick={() => logout()} className={'button ' + theme}>
        Logout
      </button>
    </div>
  );
}
