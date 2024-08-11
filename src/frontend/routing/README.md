# React Routing

> ... <!-- TODO -->

### Run (localhost)

```bash
$ yarn startFrontend2
```

## React Navigation

All of those options have the purpose of redirecting to another page or referring/pointing to something. However, they are used differently.

- `<Link>`: similar to an HTML anchor element (`<a>`).
- `<NavLink>`: like `<Link>` but with the `active` class attribute for styling.
- `Navigate`: programmatic, used for conditional redirects.
- `useNavigate()`: programatic, used with in functions.

```javascript
<NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
```

## Prop Drilling

### Prop Drilling
- passing down props several levels.
- for a simple project props can be passed down to child components dynamically. For complex projects the **"React Context"** is recommended.
- props can even passed down a 'route' with `cloneElement()`. It takes the given element `<User/>` but rerenders it as a 'new' element but with the given attributes `isLoggedIn`, `toggleIsLoggedIn`:

```javascript
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Routes>
		<Route
		  path="/user"
		  element={React.cloneElement(<User/>, {
		    isLoggedIn: isLoggedIn,
		    toggleIsLoggedIn: () => setIsLoggedIn(!isLoggedIn),
		  })}
		/>
      </Routes>
    </>
  );
}
```

## Dependencies

- vite
- react
- react-dom
- react-router-dom
- prettier + eslint