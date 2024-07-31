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
  async function handleUpload(event) {
    event.preventDefault();
    try {
      if (event.target[0].files[0]) {
        const uploadData = new FormData();
        uploadData.append('file', event.target[0].files[0]);
        const avatarUrl = await apiService.uploadAvatar(uploadData);

        // const selectedFile = event.target[0].files[0];
        // const avatarUrl = await apiService.uploadAvatar({ file: selectedFile });

        const apiResponse = await apiService.storeAvatar({ avatarUrl });
        console.log('apiResponse :>> ', apiResponse);

        setNewMessage({ text: 'Image Uploader clicked!', type: 'default' });
      }
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }

  function daytimeGreeter() {
    let greeting = '';
    const now = new Date();
    const hour = now.getHours();
    if ((hour >= 22) | (hour < 6)) greeting = 'Have a restful night';
    else if (hour >= 18) greeting = 'Good evening';
    else if (hour >= 14) greeting = 'Good afternoon';
    else if (hour >= 10) greeting = 'Have a great day';
    else if (hour >= 6) greeting = 'Good morning';
    return greeting;
  }

  return (
    <>
      <header className='header'>
        <h1 className='h1'>FILE UPLOAD</h1>
      </header>

      <main className='main dashboard'>
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
          <article id='userName' className='card card-lg'>
            <h2 className='h2'>
              {daytimeGreeter()} <span>{currentUser.username}</span> !
            </h2>
          </article>

          <article id='userAvatar' className='card card-sm'>
            <div>
              <img src={currentUser.avatar} width='50px' height='50px' alt='avatar' />
            </div>
          </article>

          <article id='userBio' className='card card-md'>
            <p>{currentUser.bio}</p>
          </article>

          <article id='userRole' className='card card-sm'>
            <p>Your role:</p>
            <p className='h3'>{currentUser.role}</p>
          </article>

          <article id='imgUploader' className='card card-md'>
            <form className='form' onSubmit={(event) => handleUpload(event)}>
              <label className='h3' htmlFor='avatar-upload'>
                Change Profile Picture
              </label>
              <input
                className='input'
                type='file'
                id='avatar-upload'
                name='avatar-upload'
                accept='.jpg, .jpeg, .png, .webp'
              />

              <button className='button'>Save</button>
            </form>
          </article>

          <article id='logout' className='card card-sm'>
            <button className='button' onClick={() => handleLogout()}>
              Logout
            </button>
          </article>
        </IsPrivate>
      </main>

      <footer className='footer'>
        <p>some footer</p>
      </footer>
    </>
  );
}
