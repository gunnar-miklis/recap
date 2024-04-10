## Client-Server Communication

-   **Client:** requesting and cosuming content / displaying content.
-   **Server:** responding and providing content / making content accessible.
-   **Database:** (mainly) storing content. (reliable, efficient, scalable, concurrency(multiple clients), data abstractoin, query language)

## Request-Response Cycle: exchange pattern

1. **URL**, adressing specific content, locating resources.

2. **DNS**, convert domain IP <> "word phrase" (127.0.0.1 <> localhost).

3. **HTTP**, ruleset for the communication, transfer/deliver content "stateless" (only for the current request).

    - request: _http verbs_: communicate the "intention" of each request (GET, POST, PUT, DELETE).
    - response: _http status codes_: (2XX success, 3XX redirect, 4XX client error, 5XX server error).

4. **Browser**, interpreting/rendering/presenting content.

## Node

-   node = 'runtime environment' allowing JavaScript to run outside the browser.
-   a runtime environment includes:
    -   compiler/interpreter,
    -   memory managment,
    -   access to file system,
    -   native OS features.

## Libraries

-   one or more files containing custom functions to speed up or enable common functionality.
-   react, ...

## Frameworks

-   pre-set structures and rulesets we have to follow: _"the frameworks is in charge when building applications"_.
-   express, angular, ...

## API (application programming interface)

-   allow developers to create complex functionality more easily...
    -   by splitting up the codebase into smaller services.
    -   by abstracting complex code (away) and providing some easier syntax to use in its place (like a electric/power socket. without wiring each cable directly, just pluging in the socket)
-   client-side: extending functionality within a browser.
-   server-side providing access (read/write) to specific content/data.
-   (in web) usually "object-based", returning data as JSON.
