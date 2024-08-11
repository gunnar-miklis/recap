# SERVER

> File Storage via Cloudinary

The foundation of this project comes from: **[JWT-Auth](../../jwt-auth/server/README.md)**.

## Run (localhost)

```bash
$ yarn startBackend5
```

## Procedure

#### 1. Receive form-data

Parse the html request for form-data via `multer` middleware.

#### 2. Upload to cloudinary

Request the received file on the cloudinary api via a transaction method.

#### 3. Store File-URL and File-ID in Database

Store the Public-URL, Image-ID and other usefull file parameters in a text based database.

## Multer, Middleware

- Can parse a html request to expose `multipart/form-data`.
- `formParser.single()` makes form data accessible for further processing.
- There are two tyes of storages `multer` can use: `.memoryStorage()` or `.diskStorage()`.

## Cloudinary, Image and Video API Platform

1. `.config()`, which provides credentials for API communication.
2. `options`-object: can be used to specify the resource type, folder, tags, id, etc and even perform transformations like formating to a certain image format or even more advanced AI based stuff like background removal, object centering, and more.
3. A transaction method:
   - `uploader.upload()`: can be used for absolute pathes like a specifc url or a local path `../assets/image.png`.
   - `uploader.upload_stream()`: can be used for files sent via form-data. It can read the buffer exposed by multer middleware parser. This one must be wrapped in a `Promise`.
   - `uploader.destroy(`, etc.: can be used for deleting resources.
4. The result will be an object containing information about the upoaded image including a `Public URL` and `File ID`.

## Dependencies

- express
- dotenv
- cors
- morgan
- mongoose
- bcryptjs
- jsonwebtoken
- express-jwt
- cloudinary
- multer
- nodemon
- prettier + eslint

## Endpoints

#### Base URL: `/api/v1`

| method | route     | middleware   | uri          | payload          | header             |
| ------ | --------- | ------------ | ------------ | ---------------- | ------------------ |
| POST   | protected | auth, multer | /file/upload | userId, username | Auth: 'Bearer JWT' |
| DELETE | protected | auth         | /file/delete | userId, username | Auth: 'Bearer JWT' |
