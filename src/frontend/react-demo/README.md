## SIMPLE FRONTEND 1

> **REACT + AXIOS + VITE**

## Description

### introduce

-   vite (bundler)
-   react (jsx)
-   styling (css)
-   SPA rendering

### react

-   react DOM
-   state, props, props.children
-   conditional rendering

### component-based architecture

-   **modularity, reusability, encapsulation**
-   components (**separation of concerns**)
-   controlled components (form input, form submit)

### flow of information

> _"data down, actions up"_

-   pass down: props
-   lift up: callbacks

### lifecycle

-   mount, update, unmount
-   side effects
-   **hooks**: useState(), useEffect(), useRef()

### custom toast bar component

-   trigger and show status message
-   setInterval(), **cleanup**: clearInterval()

## Dependencies

-   `vite`
-   `react`
-   `axios`
-   `prettier + eslint`

## Run (localhost)

### start json-server (fake api)

```bash
$ yarn startJsonServer
```

### start frontend

```bash
$ yarn startFrontend1
```

## Endpoints

| endpoints   | method | uri                                 |
| ----------- | ------ | ----------------------------------- |
| all posts   | GET    | http://localhost:3000/api/posts     |
| one post    | GET    | http://localhost:3000/api/posts/:id |
| one post    | POST   | http://localhost:3000/api/posts     |
| one post    | PATCH  | http://localhost:3000/api/posts/:id |
| one post    | DELETE | http://localhost:3000/api/posts/:id |
| all authors | GET    | http://localhost:3000/api/authors   |
