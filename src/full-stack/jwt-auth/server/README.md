# SERVER

> Authentication with JSON Web Token (JWT)

Token-based authentication is stateless which means that no information is stored on the server.

## Run (localhost)

```bash
$ yarn startBackend4
```

## Procedure

#### 1. Login

- **Authentication**: The client provides credentials (username, password).
- **Validation**:
  - The server confirms if critera are met (password requirements).
  - The server creates a JWT Token with the `username` as payload.
    > While creating JWTs with `jwt.sign(payload, secret, options)`, the payload **MUST** be an object !
- The client saves the JWT Token (local storage).

#### 2. Verify

- **Authentication**: The client sends the JWT Token each time requesting a protected route. (Protected routes can only be accessed, when a valid JWT Token is sent in the request.)
- **Validation** + **Verification**: The server makes sure there's a correct JWT Token in the request.
- **Authorization**: The server then reveals the payload (`username`) to the client.

#### 3. Access

- The client can access protected routes.

## Endpoints

#### Base URL: `/api/v1`

| method | middleware | uri          | payload              | header             | authentication              |
| ------ | ---------- | ------------ | -------------------- | ------------------ | --------------------------- |
| POST   |            | /auth/signup | {username, password} |                    |                             |
| POST   |            | /auth/login  | {username, password} |                    | create JWT, sent username   |
| GET    | protected  | /auth/verify |                      | Auth: 'Bearer JWT' | handle JWT, reveal username |
| GET    | protected  | /campuses    |                      | Auth: 'Bearer JWT' | handle JWT                  |
| DELETE | protected  | /delete      | {username}           | Auth: 'Bearer JWT' | handle JWT                  |

## Middleware to Validate JWTs sent in the Header

1. The `getTokenFromHeader()` function checks if there's a `'Bearer'` string in the `headers.authorization`. If so, it returns the JWT.
2. Then the `jwt({})` method (from the `express-jwt` package) checks if the sent token is valid.

## Database Models

### UserSchema

- username: required + unique
- password: required

### CampusSchema\*\*

> \*\*Demonstration Purpose: just to show "something" interactive behind a protective route.

- city: required + unique
- students: relation

but only display cities

```javascript
CampusModel.find({}, { city: 1, _id: 0 });
```

## Other

### Signup Validations

1. Provide username/password.
2. Password requirements (number, upper/lowercase, 6 chars).
3. Username must be unique (does not exist already).

### Login Validations

1. Provide username/password.
2. Wrong credentials: Username does not exist.
3. Wrong credentials: Password incorrect.

### Error Handling

- in code base: `throw new Error()`.
- catch errors (try..catch) and pass them on `next(error)`.
- very last middleware handles all thrown and passed errors:

1. console log errors
   - `error.name`,
   - `error.message`,
   - `request.method`,
   - `request.path`.
2. sent error messages to client: `response.status(400/500).json({error:'message'})`
   - 404 Route does not exist,
   - 400 Validation erros,
   - 401 JWT, Unauthorized,
   - 503 Mongoose, (connection) errors,
   - 500 Unexpected error = internal server error.

## Dependencies

- express
- dotenv
- cors
- morgan
- mongoose
- bcryptjs
- jsonwebtoken
- express-jwt
- nodemon
- prettier + eslint