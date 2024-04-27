# json-server

_"A Node Module that you can use to create demo rest json webservice in less than a minute. All you need is a JSON file for sample data."_

-   provide instant restful api
-   mock some data for demo or testing

## start server

```bash
$ yarn startJsonServer
```

## fake-blog.json

| endpoints   | method | uri                             |
| ----------- | ------ | ------------------------------- |
| all authors | GET    | http://localhost:8000/authors   |
| all posts   | GET    | http://localhost:8000/posts     |
| one post    | GET    | http://localhost:8000/posts/:id |
| one post    | POST   | http://localhost:8000/posts     |
| one post    | PUT    | http://localhost:8000/posts/:id |
| one post    | DELETE | http://localhost:8000/posts/:id |
