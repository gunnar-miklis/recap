import { Link } from 'react-router-dom';

export default function Home({ isLoggedIn, toggleIsLoggedIn }) {
  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn ? (
        <>
          <p>
            <Link to='/user'>User is: 🔓</Link>
          </p>
          <button onClick={() => toggleIsLoggedIn()}>Log out</button>
        </>
      ) : (
        <>
          <p>
            <Link to='/user'>User is: 🔒</Link>
          </p>
          <button onClick={() => toggleIsLoggedIn()}>Log in</button>
        </>
      )}
    </div>
  );
}
