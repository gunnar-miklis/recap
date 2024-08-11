# CLIENT

> Authentication with JSON Web Token (JWT)

Token-based authentication is stateless which means that no information is stored on the server.

### Run (localhost)

```bash
$ yarn startFrontend4
```


## Approach

Have a SPA dashboard which updates it's view dynamically based on the "login state" (private/public).

### Dashboard Parts

| login state | component                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------ |
| **public**  | Signup                                                                                           |
| **public**  | Login                                                                                            |
| private     | Verify (to demonstrate the verify mechanism)                                                     |
| private     | Logout                                                                                           |
| private     | Delete                                                                                           |
| private     | Display Current User                                                                             |
| private     | Campuses (demonstration purpose: just to show "something" interactive behind a protective route) |

## Procedure

1. Signup/Login: api.post( {username, password} ).
2. Verify: api.get().
3. Access via IsPrivate/IsPublic Components.

## Components

1. **AuthContext Provider**: provide state of authentication across entire app.
2. **IsPrivate / IsPublic Components**: Control the access to certain components.
3. **Toast**: Display messages/erros to provide feedback for the user.

### 1. AuthContext

- States: `isLoggedIn`, `currentUser`.
- On login:
  - Receive JWT from server.
  - Store JWT in localStorage or sessionStorage.
  - Verify JWT.
- On verfiy:
  - Receive user data (username) from server.
  - Set states.
  - If there's any error, logout user.
- On logout:
  - Remove JWT from Storage.
  - Reset states.
- Provider passes: **states** `isLoggedIn`, `currentUser` and **methods** `loginUser`, `logoutUser`.

### 2. IsPrivate / IsPublic Components

- Both displaying their children only if `isLoggedIn = IsPrivate` or `!isLoggedIn = IsPublic`.

### 3. Toast

- Displays a stack (list) of messages.
- Each message disappears automatically after a certain duration.
- "Default messages" are distinct from "error messages".

## Dependencies

- vite
- react
- react-dom
- axios
- prettier + eslint