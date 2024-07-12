import express from 'express';
const app = express();

import mongoose from 'mongoose';
import requestLogger from 'morgan';
import 'dotenv/config';
import { hasJWT } from './mw/hasJWT.js';
import handleErrors from './mw/error-handling.js';
import campusRoutes from './routes/campus.js';
import authRoutes from './routes/auth.js';

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/refresh-dev';
(async () => {
  try {
    await mongoose.connect(dbURI);
    console.log(`Database connected: ${dbURI}`);
  } catch (error) {
    console.error(error);
  }
})();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));

// handle routes
app.get('/api/v1/', (req, res, next) => {
  res.status(200).json({ message: 'Application running.' });
});
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', hasJWT, campusRoutes);
app.use(handleErrors);

// run server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
