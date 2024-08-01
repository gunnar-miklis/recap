import { useEffect, useState } from 'react';
import { useAuthContext } from './context/AuthContext';
import { useToastContext } from './context/ToastContext';
import IsPrivate from './components/IsPrivate';
import IsPublic from './components/IsPublic';
import apiService from './utils/apiService';
import { daytimeGreeter } from './utils/functions';

export default function App() {
  const { isLoggedIn, currentUser, setCurrentUser, loginUser, logoutUser } = useAuthContext();
  const { setNewMessage } = useToastContext();

  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAvatarUploader, setShowAvatarUploader] = useState(false);
  const [showEditBio, setShowEditBio] = useState(false);

  // reset states
  useEffect(() => {
	if (!isLoggedIn) {
		setUsername('');
		setPassword('');
		setShowAvatarUploader(false);
		setShowEditBio(false);
	}
  }, [isLoggedIn]);

  // NOTE: auth handler
  async function handleSignup(event) {
    event.preventDefault();

	const newUsername = event.target[0].value;
	const newPassword = event.target[1].value;

    try {
      // api call: create new user in database
      const apiData = await apiService.signup({ username: newUsername, password: newPassword });

      // if signup was successful login user immediately
      // otherwise handle errors
      if (Object.keys(apiData)[0] === 'message') {
        setNewMessage({ text: apiData.message, type: 'default' });
        handleLogin(null, newUsername, newPassword);
      } else if (Object.keys(apiData)[0] === 'error') throw new Error(apiData.error);
      else throw new Error('Unexpexted Error during signup');
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }
  async function handleLogin(event, signupUsername, signupPassword) {

	// COMMENT: This is handled very bad. Would be much clearer when using TypeScript.
	let loginUsername = '';
	let loginPassword = '';

    if (event) {
		event.preventDefault();
		loginUsername = event.target[0].value;
		loginPassword = event.target[1].value;
	} else if ( signupUsername && signupPassword ) {
		loginUsername = signupUsername;
		loginPassword = signupPassword
	}

    try {
      // api call: get a auth token then verify user using it
      const message = await loginUser(loginUsername, loginPassword);
      setNewMessage({ text: message, type: 'default' });
      setUsername('');
      setPassword('');
      setShowSignup(false);
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }
  function handleLogout() {
    try {
      // reset all states
      const message = logoutUser();
      setNewMessage({ text: message, type: 'default' });
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }

  // NOTE: file handler
  async function handleUpload(event) {
    event.preventDefault();
    try {
      if (event.target[0].files[0]) {
        // the "FormData()" object collects the form-data and encodes the file-data. it's necessary for handling file uploads of "multipart/form-data".
        const formData = new FormData();
        formData.append('inputFile', event.target[0].files[0]);

        // api call: upload image to cloudinary and store url in database
        const apiData = await apiService.uploadAvatar(formData);

        // if successful update the state/avatar-image immediately
        // otherwise handle errors
        if (Object.keys(apiData)[0] === 'message') {
          setCurrentUser((prevState) => ({ ...prevState, avatar: apiData.avatar }));
          setShowAvatarUploader(false);
          setNewMessage({ text: apiData.message, type: 'default' });
        } else if (Object.keys(apiData)[0] === 'error') throw new Error(apiData.error);
        else throw new Error('Unexpexted Error during uploading profil picture');
      }
    } catch (error) {
      setNewMessage({ text: error.message, type: 'error' });
    }
  }
  async function handleDeleteAvatar() {
    try {
      // api call: delete image from cloudinary and update database
      const apiData = await apiService.deleteAvatar();

      // if successful update the state/avatar-image immediately
      // otherwise handle errors
      if (Object.keys(apiData)[0] === 'message') {
        setCurrentUser((prevState) => ({ ...prevState, avatar: apiData.avatar }));
        setShowAvatarUploader(false);
        setNewMessage({ text: apiData.message, type: 'default' });
      } else if (Object.keys(apiData)[0] === 'error') throw new Error(apiData.error);
      else throw new Error('Unexpexted Error during deleting profil picture');
    } catch (error) {}
  }

  async function handleBioUpdates(event) {
	event.preventDefault();
	const text = event.target.value;
	// const apiData = await apiService.updateBio(text);
	setShowEditBio(false);
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
                <button type='submit' className='button'>
                  Sign Up
                </button>
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
                  autoFocus
                />
                <input
                  className='input'
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password'
                />
                <button type='submit' className='button'>
                  Login
                </button>
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
            <div className={`avatarWrapper ${showAvatarUploader ? 'active' : ''}`}>
              <img src={currentUser.avatar} width='80px' height='80px' alt='avatar' />
            </div>
            <button className='button' onClick={() => setShowAvatarUploader(!showAvatarUploader)}>
              Edit
            </button>
          </article>

          {showAvatarUploader && (
            <article id='avatarUploader' className='card card-sm active'>
              <label className='h3' htmlFor='avatar-upload'>
                Upload a new profile picture
              </label>
              <form
                className='form'
                encType='multipart/form-data'
                onSubmit={(event) => handleUpload(event)}
              >
                <input
                  className='input file-input'
                  type='file'
                  id='avatar-upload'
                  name='avatar-upload'
                  accept='.jpg, .jpeg, .png, .webp'
				  onChange={()=>setNewMessage({text:'File selected', type: 'default'})}
                />
                <button type='submit' className='button'>
                  Upload
                </button>
              </form>
            </article>
          )}

          {showAvatarUploader && (
            <article id='avatarUploader' className='card card-sm active'>
              <p className='h3'>Delete the current profile picture</p>
              <button className='button' onClick={() => handleDeleteAvatar()}>
                Delete
              </button>
            </article>
          )}

          {showEditBio ? (
            <article id='userBio' className='card card-md active'>
              <form className='form' onSubmit={(event) => handleBioUpdates(event)}>
                <textarea
                  className='textarea'
                  rows={5}
                  value={currentUser.bio}
                  onChange={(e) =>
                    setCurrentUser((prevState) => ({ ...prevState, bio: e.target.value }))
                  }
                />
                <button type='submit' className='button'>
                  Save
                </button>
              </form>
            </article>
          ) : (
            <article id='userBio' className='card card-md'>
              <p>{currentUser.bio}</p>
              <button className='button' onClick={() => setShowEditBio(true)}>
                Edit
              </button>
            </article>
          )}

          <article id='userRole' className='card card-sm'>
            <p>Role</p>
            <p className='h3'>{currentUser.role}</p>
          </article>

          <article id='logout' className='card card-sm'>
            <button className='button' onClick={() => handleLogout()}>
              Logout
            </button>
          </article>
        </IsPrivate>
      </main>

      <footer className='footer'>
        <p></p>
      </footer>
    </>
  );
}
