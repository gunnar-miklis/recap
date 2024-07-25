import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import requestLogger from 'morgan';
import handleErrors from './mw/handleErrors';
import authRoutes from './routes/auth';
import fileManagmentRoutes from './routes/file-management';

// database
let isDbConnected = false;
const dbURI = process.env.MONGODB_URI_FILE_UPLOAD;
(async function () {
  try {
    await mongoose.connect(dbURI);
    isDbConnected = true;
    console.log(`Database connected: ${dbURI}`);
  } catch (error) {
    isDbConnected(false);
    throw new Error(error);
  }
})();

// create server instance
const app = express();

// middlwares
app.use((_, _, next) => {
  try {
    if (!isDbConnected) throw new Error('Database connection error');
  } catch (error) {
    next(error);
  }
});
app.use(cors({ origin: process.env.EXPRESS_FRONTEND_URI }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));

// routes
app.get('/api/v1', (_, res) => res.status(200).json({ message: 'Server is running!' }));
app.use('/api/v1', authRoutes);
app.use('/api/v1', fileManagmentRoutes);
app.use((_, _, next) => {
  try {
    throw new Error('Route does not exist');
  } catch (error) {
    next(error);
  }
});

// final middleware: errors
app.use(handleErrors);

// run server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
