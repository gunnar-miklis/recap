## SIMPLE BACKEND 1

> **REST API + CRUD + DB**

## Description

### introduce

-   ODM
-   MVC
-   Response-Request-Cylce
-   Separation of concerns
-   ES Module System
-   Thunder Client

### set up mongoDB

-   configure connection
-   create schema and model
-   use schema utilities (`set`, `validate`)
-   data modeling/structuring/relations: embeded (1-to-1) vs references (1-to-many, many-to-many)
-   seeding database
-   `.populate()` relations
-   use ODM specific methods: `.select()`, `.sort()`, `.countDocuments()`

### setup express

-   `const app = express();`
-   `const PORT = 3000;`
-   `app.listen(PORT, () => { console.log('Server running') });`

### perform CRUD operations

-   POST, GET, PUT, DELETE
-   use ODM methods: `Model.find()`, `Model.findById()`, `Model.create()`, `Model.findOneAndUpdate()`, `Model.findOneAndDelete()`
-   use `request.body`
-   use `request.params`
-   use `request.query`

### setup (custom) middleware

-   use `next()`
-   `app.use(addTimestampToLog);`

### setup error handling

-   create own CustomError class
-   `app.use(logErrors);`
-   `app.use(invalidPath);`
-   `app.use(handleClientErrors);`
-   `app.use(handleErrors);`

## Dependencies

-   express
-   mongoose
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
$ yarn startBackend1
```

## RESTful

-   always returns one json object
-   send appropriate status codes each request (200, 400, 500)

| endpoints               | method | uri                                               |
| ----------------------- | ------ | ------------------------------------------------- |
| all students            | GET    | http://localhost:3000/api/students                |
| all students, enrolled  | GET    | http://localhost:3000/api/students/enrolled       |
| all students, count     | GET    | http://localhost:3000/api/students/count          |
| all students, search by | GET    | http://localhost:3000/api/students/search?lang=de |
| one student             | GET    | http://localhost:3000/api/students/:id            |
| one student             | POST   | http://localhost:3000/api/students            |
| one student             | PUT    | http://localhost:3000/api/students/:id            |
| one student             | DELETE | http://localhost:3000/api/students/:id            |
| all campuses            | GET    | http://localhost:3000/api/campuses                |
| one campuses            | GET    | http://localhost:3000/api/campuses/name           |
