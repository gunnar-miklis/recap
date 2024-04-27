## SIMPLE BACKEND 2

> **security - password encryption**

## Description

### introduce

-   Authentication: provide credentials
-   Verification: confirm thruthfulness
-   Validation: confirm meeting criteria/standards/rules (password requirements)
-   Authorization: allow access (guest, editor, admin)

### bcryptjs

-   **salt** with: `bcrypt.genSaltSync(saltRounds)`
-   encrypt (**hash**) with: `bcrypt.hashSync(plainPassword, salt)`
-   decrypt/**verify** (compare hashes) with: `bcrypt.compareSync(plainPassword, dbUser.password)`

## Dependencies

-   express
-   mongoose
-   bcryptjs
-   morgan (request logger)
-   nodemon (testing)
-   prettier + eslint

## Run (localhost)

### start database

```bash
$ mongod --dbpath ~/.mongodb/db > /dev/null 2>&1 &
```

### start server

```bash
$ yarn startBackend2
```

## RESTful

-   always returns one json object
-   send appropriate status codes each request (200, 400, 500)

| endpoints        | method | uri                                  |
| ---------------- | ------ | ------------------------------------ |
| all users        | GET    | http://localhost:3000/api/users      |
| one user         | GET    | http://localhost:3000/api/users/:id  |
| one user         | POST   | http://localhost:3000/api/users  |
| one user         | PUT    | http://localhost:3000/api/users/:id  |
| one user         | DELETE | http://localhost:3000/api/users/:id  |
| one user, verify | POST   | http://localhost:3000/api/users/auth |
