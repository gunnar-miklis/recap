import { useState } from 'react';
import IsPrivate from './components/IsPrivate';
import IsPublic from './components/IsPublic';
import { useAuthContext } from './context/AuthContext';
import apiService from './utils/apiService';
import { useToastContext } from './context/ToastContext';

export default function App() {
  const { currentUser, loginUser, logoutUser } = useAuthContext();
  const { setNewMessage } = useToastContext();
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(event) {
    event.preventDefault();
    try {
      const apiData = await apiService.signup({ username, password });
      if (Object.keys(apiData)[0] === 'message') {
        setNewMessage({ text: apiData.message, type: 'default' });
        handleLogin();
      } else if (Object.keys(apiData)[0] === 'error') throw new Error(apiData.error);
      else throw new Error('Unexpexted Error during signup');
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }
  async function handleLogin(event) {
    if (event) event.preventDefault();
    try {
      const message = await loginUser(username, password);
      setNewMessage({ text: message, type: 'default' });
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }
  function handleLogout() {
    try {
      const message = logoutUser();
      setUsername('');
      setPassword('');
      setNewMessage({ text: message, type: 'default' });
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }

  return (
    <>
      <header className='header'>
        <h1 className='h1'>FILE UPLOAD</h1>
      </header>

      <main className='main'>
        <IsPrivate>
          <article id='currentUser' className='card card-lg'>
            <h1 className='h1'>{currentUser.username}</h1>
          </article>
        </IsPrivate>

        <IsPublic>
          {showSignup && (
            <article id='signup' className='card card-md'>
              <h2 className='h2'>Signup</h2>
              <form className='form' onSubmit={(event) => handleSignup(event)}>
                <input
                  className='input'
                  type='text'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='username'
                />
                <input
                  className='input'
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password'
                />
                <button className='button'>Sign Up</button>
              </form>
              <button
                className='link'
                onClick={() => setShowSignup(false)}
                style={{ marginTop: '0.5rem' }}
              >
                Login
              </button>
            </article>
          )}
        </IsPublic>

        <IsPublic>
          {!showSignup && (
            <article id='login' className='card card-md'>
              <h2 className='h2'>Login</h2>
              <form className='form' onSubmit={(event) => handleLogin(event)}>
                <input
                  className='input'
                  type='text'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='username'
                />
                <input
                  className='input'
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password'
                />
                <button className='button'>Login</button>
              </form>
              <button
                className='link'
                onClick={() => setShowSignup(true)}
                style={{ marginTop: '0.5rem' }}
              >
                Signup
              </button>
            </article>
          )}
        </IsPublic>

        <IsPrivate>
          <article id='logout' className='card card-sm'>
            <button className='button' onClick={() => handleLogout()}>
              Logout
            </button>
          </article>
        </IsPrivate>
      </main>
    </>
  );
}
