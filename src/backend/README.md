# Architectural Style: REST (REpresentational State Transfer)

> _"A way of desining web services, to make communication between systems on the Web easier and uniform."_

- simple (uniform and standardized)
- scalable (stateless, decentralized)
- interoperable (can be consumed by various clients)

## Core Principles / Constraints

### Client-Server Architecture

- client and server are separated.
- client-server-request cycle.

### Statelessness

- server does not store any state between request.
- each client request must contain all the necessary information to understand the request.

### Uniform Interface

- having a consistent way structuring URLs.
- include HTTP standard methods (verbs: GET, POST, PUT, DELETE) to indicate the action.

#### RESTful Endpoints

| verb      | action      | url              | request body |
| --------- | ----------- | ---------------- | ------------ |
| GET       | Fetch Data  | `/api/posts`     | empty        |
| POST      | Create Data | `/api/posts`     | JSON         |
| PUT/PATCH | Update Data | `/api/posts/:id` | JSON         |
| DELETE    | Delete Data | `/api/posts/:id` | empty        |

### Resource-Based

- everything in REST is treated as a resource (objects, images, files, processes, etc.)
- each resource has its own unique identifier (URI), can be anything that uniquely identifies the resource (database ID, username, slug)

(REST itself doesn't dictate the format. However RESTful APIs often follow the convention that responses are delivered in JSON or XML objects.)

## Handle responses uniformly with HTTP status codes

Commonly used HTTP response status codes are:

- 200 - OK
- 201 - Created
- 204 - No Content
- 301 - Moved Permanently (Redirect)
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - Internal Server Error

# Cross-Origin Resource Sharing (CORS)

> _"Access-Control-Allow-Origin"_

- client (frontend) and server (backend) will be running on different origins (PORT or Domain).
- by default, web browsers block the communication between apps that run on different originis. The browser will enforce the rule "same origin policy". This means that a web page can only make request to resources from the same origin (same website) it was loaded from.
- CORS allow to configure the server, to use additional HTTP headers to tell the browser that it allows requests from specific origins.

CORS is a node.js package for providing a Connect/Express middleware

```javascript
import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:3000', 'Client 1', 'Client 2', 'Client 3'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// CORS enable ALL routes
app.use(cors(corsOptions));

// CORS for a single route
app.get('/products/:id', cors(corsOptions), (req, res, next) => {
  res.json({ msg: 'example' });
});
```
