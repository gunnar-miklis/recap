import express from 'express';
const app = express();

import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import requestLogger from 'morgan';
import authRoutes from './routes/auth.js';
import otherRoutes from './routes/other.js';
import handleErrors from './mw/error-handling.js';

// database connection
const dbURI = process.env.MONGODB_URI;
(async () => {
  try {
    await mongoose.connect(dbURI);
    console.log(`Database connected: ${dbURI}`);
  } catch (error) {
    console.error(error);
  }
})();

// middlewares
app.use(cors({ origin: process.env.EXPRESS_FRONTEND_URI }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));

// handle routes
app.get('/api/v1/', (_, res) => {
  res.status(200).json({ message: 'Api v1 running' });
});
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', otherRoutes);
app.use(() => {
  throw new Error('Route does not exist');
});
app.use(handleErrors);

// run server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
