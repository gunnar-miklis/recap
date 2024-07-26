import express from 'express';
import connectDB from './db/config.js';
import requestLogger from 'morgan';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));

app.get('/api', (_req, res, _next) => {
  res.status(200).json({ message: 'Application running.' });
});

connectDB();

import crudRoutes from './routes/crud.js';
app.use('/api', crudRoutes);
import authRoutes from './routes/authentication.js';
app.use('/api', authRoutes);

import handleErrors from './mw/error-handling.js';
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
