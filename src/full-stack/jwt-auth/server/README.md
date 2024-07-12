# SERVER

> Authentication with JSON Web Token (JWT)

## Procedure

#### 1. Login

- **Authentication**: The client provides credentials (username, password).
- **Validation**:
  - The server confirms if critera are met (password requirements).
  - The server creates a JWT Token with the `username` as payload.
- The client saves the JWT Token (local storage).

#### 2. Verify

- **Authentication**: The client sends the JWT Token each time requesting a protected route. (Protected routes can only be accessed, when a valid JWT Token is sent in the request.)
- **Validation** + **Verification**: The server makes sure there's a correct JWT Token in the request.
- **Authorization**: The server then reveals the payload (`username`) to the client.

#### 3. Access

- The client can access protected routes.

## Endpoints

| method | middleware | uri                 | payload                   | authentication              |
| ------ | ---------- | ------------------- | ------------------------- | --------------------------- |
| POST   |            | /api/v1/auth/signup | {username, password}      |                             |
| POST   |            | /api/v1/auth/login  | {username, password}      | create JWT, sent username   |
| GET    | protected  | /api/v1/auth/verify | Header.Auth: 'Bearer JWT' | handle JWT, reveal username |
| GET    | protected  | /api/v1/campus      | Header.Auth: 'Bearer JWT' | handle JWT                  |
