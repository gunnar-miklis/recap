# CLIENT

> File Storage via Cloudinary

The foundation of this project comes from: **[JWT-Auth](../../jwt-auth/client/README.md)**.

### Dashboard Parts (Extension)

| login state | component            | visibility |
| ----------- | -------------------- | ---------- |
| **public**  | Signup               |            |
| **public**  | Login                |            |
| private     | User name            |            |
| private     | User avatar          |            |
| private     | Avatar uploader from | toggle     |
| private     | Avatar delete        | toggle     |
| private     | User bio             |            |
| private     | User bio updater     | toggle     |
| private     | User role            |            |
| private     | Logout               |            |

## Procedure

1. User **select a file** via `<form encType='multipart/form-data'>`.
2. **Upload handler** encodes the form-data (`new FormData()`) and make an api request. - The `FormData()` object collects the form-data and encodes the file-data. It's necessary for handling file uploads for type of `multipart/form-data`. - Api header can be set to: `headers: { 'content-type': 'multipart/form-data' }`.
   (2. **Delete handler** makes an api request)
3. Receive the **File-URL** from the api and update the current user accordingly.

## AuthContext (Extension)

- Token Expiration:
  - token automatically expires after a specific time.
  - user gets logged out instantly on token expiration.

## Toast (Extension)

- Toast is now build as ToastContext. Allowing messages to be displayed always on top across sites and modules, even through rerendering.
- Message appearing/disappearing is now animated.
- Messages can now be dismissed on click.
- ToastContext is further abstracted to be build as reusable component.
