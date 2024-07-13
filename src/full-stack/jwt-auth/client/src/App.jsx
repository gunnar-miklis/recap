import { useState } from 'react';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { isLoggedIn, currentUser, loginUser, logoutUser } = useAuthContext();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [campuses, setCampuses] = useState([]);

  function handleSignUp(event) {
    event.preventDefault();

    // post /auth/signup
  }
  function handleLogin(event) {
    event.preventDefault();

    // post /auth/login
  }

  function verfiyUser() {
    // get /auth/verify
  }

  function getCampuses() {
    // get /campus
    setCampuses([]);
  }

  return (
    <div id='app'>
      <header>
        <h1>
          AUTHENTICATION
          <br />dashboard
        </h1>
      </header>
      <main>
        <div id='currentUser'>
          <h2>Current User</h2>
          <p>{currentUser.username}</p>
        </div>
        <div id='signup'>
          <h2>Signup</h2>
          <form onSubmit={handleSignUp}>
            <input type='text' name='username' value={userName} placeholder='username' />
            <input type='password' name='password' value={password} placeholder='password' />
            <button>Sign Up</button>
          </form>
        </div>
        <div id='login'>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type='text' name='username' value={userName} placeholder='username' />
            <input type='password' name='password' value={password} placeholder='password' />
            <button>Login</button>
          </form>
        </div>
        <div id='verify'>
          <h2>Verify</h2>
          <button onClick={() => verfiyUser()}>Verfiy</button>
        </div>
        <div id='campus'>
          <h2>Campus</h2>
          {campuses.length !== 0 ? (
            campuses.map((campus) => <p>{campus}</p>)
          ) : (
            <button onClick={() => getCampuses()}>getCampuses</button>
          )}
        </div>
        <div id='logout'>
          <h2>Logout</h2>
          <button onClick={() => logoutUser()}>Logout</button>
        </div>
      </main>
    </div>
  );
}

export default App;
