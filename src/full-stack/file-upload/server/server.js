import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import requestLogger from 'morgan';
import handleErrors, { ClientInputError, DatabaseError } from './mw/handleErrors.js';
import authRoutes from './routes/auth.js';
import fileManagmentRoutes from './routes/file-management.js';
import { UserModel } from './db/schema.js';
import { authorization } from './mw/authorization.js';

// NOTE: database
// with this approach I can run the server and give feedback to the client that the database isn't connected.
// otherwise the server should only be running when there's a database connection.
let isDbConnected = false;
const dbURI = process.env.MONGODB_URI_FILE_UPLOAD;
(async function () {
  try {
    await mongoose.connect(dbURI);
    isDbConnected = true;
    console.log(`Database connected: ${dbURI}`);
  } catch (error) {
    isDbConnected = false;
    console.error('\nDATABASE ERROR: Database not connected.\n', error);
  }
})();

// NOTE: create server instance
const app = express();

// NOTE: middlwares
app.use(cors({ origin: process.env.EXPRESS_FRONTEND_URI }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));
app.use((_req, _res, next) => {
  try {
    if (!isDbConnected) throw new DatabaseError('Connection error');
    else next();
  } catch (error) {
    next(error);
  }
});

// NOTE: routes

app.get('/api/v1', (_, res) => res.status(200).json({ message: 'Server is running!' }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/file', fileManagmentRoutes);
app.use((_req, _res, next) => {
  try {
    throw new ClientInputError('Route does not exist');
  } catch (error) {
    next(error);
  }
});

// NOTE: final middleware: errors
app.use(handleErrors);

// NOTE: run server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
