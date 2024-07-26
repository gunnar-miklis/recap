import { useState } from 'react';
import { useAuthContext } from './context/AuthContext';
import Toast from './components/Toast';
import apiService from './utils/apiService';
import IsPrivate from './components/IsPrivate';
import IsPublic from './components/IsPublic';

function App() {
  const { currentUser, loginUser, verifyUser, logoutUser } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campuses, setCampuses] = useState([]);
  const [toastMessage, setToastMessage] = useState({});
  const [showSignup, setShowSignup] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();

    try {
      const message = await apiService.signup({ username, password });
      if (!message) throw new Error('Unexpected ApiError');
      else if (Object.keys(message)[0] === 'error') throw new Error(message.error); // re-throw error passed from apiService to be displayed in toast message

      setShowSignup(false);
      showMessage(message);

      handleLogin();
    } catch (error) {
      showMessage({ error: error.message });
    }
  }

  async function handleLogin(event) {
    if (event) event.preventDefault();

    try {
      const authToken = await loginUser(username, password);
      setPassword('');
      showMessage(authToken);
    } catch (error) {
      showMessage({ error: error.message });
    }
  }

  function handleLogout() {
    logoutUser();
    showMessage({ message: `${currentUser.username} logged out.` });
    setPassword('');
    setUsername('');
    setCampuses([]);
  }

  async function handleDelete() {
    try {
      const message = await apiService.delete({ username: currentUser.username });
      if (!message) throw new Error('Unexpected ApiError');
      else if (Object.keys(message)[0] === 'error') throw new Error(message.error); // re-throw error passed from apiService to be displayed in toast message

      handleLogout();
      showMessage(message);
    } catch (error) {
      showMessage({ error: error.message });
    }
  }

  async function getCampuses() {
    try {
      const data = await apiService.getCampuses();
      if (!data) throw new Error('Unexpected ApiError');
      else if (Object.keys(data)[0] === 'error') throw new Error(data.error); // re-throw error passed from apiService to be displayed in toast message

      const { campuses } = data;
      setCampuses(campuses);
      showMessage({ message: 'Campuses loaded' });
    } catch (error) {
      showMessage({ error: error.message });
    }
  }

  function showMessage(msgObject) {
    const status = Object.keys(msgObject)[0];
    const msg = msgObject[status];

    const message = {
      status: status,
      text: msg,
    };

    switch (status) {
      case 'error':
        setToastMessage(message);
        break;
      default:
        setToastMessage({ ...message, status: 'default' });
        break;
    }
  }

  return (
    <div id='app'>
      <Toast message={toastMessage} />

      <header className='header'>
        <h1 className='h1'>AUTHENTICATION</h1>
      </header>

      <main className='main'>
        <IsPrivate>
          <div id='currentUser'>
            <h2 className='h2'>Current User</h2>
            <h1 className='h1'>{currentUser.username}</h1>
          </div>
        </IsPrivate>

        <IsPrivate>
          <div id='campuses'>
            <h2 className='h2'>Campuses</h2>
            {campuses.length !== 0 ? (
              <>
                {campuses.map((campus, i) => (
                  <p key={`city_${i}`}>{campus.city}</p>
                ))}
                <button className='button' onClick={() => setCampuses([])}>
                  clear
                </button>
              </>
            ) : (
              <button className='button' onClick={() => getCampuses()}>
                getCampuses
              </button>
            )}
          </div>
        </IsPrivate>

        <IsPublic>
          {showSignup && (
            <div id='signup'>
              <h2 className='h2'>Signup</h2>
              <form className='form' onSubmit={handleSignUp}>
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
            </div>
          )}
        </IsPublic>

        <IsPublic>
          {!showSignup && (
            <div id='login'>
              <h2 className='h2'>Login</h2>
              <form className='form' onSubmit={handleLogin}>
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
            </div>
          )}
        </IsPublic>

        <IsPrivate>
          <div id='verify'>
            <h2 className='h2'>Verify</h2>
            <button
              className='button'
              onClick={async () => {
                const message = await verifyUser();
                showMessage(message);
              }}
            >
              Verify
            </button>
          </div>
        </IsPrivate>

        <IsPrivate>
          <div id='delete'>
            <h2 className='h2'>Delete</h2>
            <button className='button' onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
        </IsPrivate>

        <IsPrivate>
          <div id='logout'>
            <h2 className='h2'>Logout</h2>
            <button className='button' onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </IsPrivate>
      </main>
    </div>
  );
}

export default App;
