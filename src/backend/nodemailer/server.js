import express from 'express';
import 'dotenv/config';
import requestLogger from 'morgan';
import handleErrors, { ClientError } from './mw/handleErrors.js';
import mailRoutes from './routes/mail.js';

// NOTE: create server instance
const app = express();

// NOTE: middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));

// NOTE: routes
app.get('/api/v1', (_, res) => res.status(200).json({ message: 'Server is running!' }));
app.use('/api/v1/mail', mailRoutes);
app.use((_req, _res, next) => next(new ClientError('Route does not exist')));

// NOTE: final middleware: errors
app.use(handleErrors);

// NOTE: run server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
