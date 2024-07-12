import express from 'express';
import connectDB from './db/config.js';
import requestLogger from 'morgan';
import addTimestampToLog from './middleware/custom-mw.js';

const app = express();
const PORT = 3000;

// NOTE: middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));
app.use(addTimestampToLog);

connectDB();

app.get('/api', (req, res, next) => {
  res.json({ message: 'Application running.' });
});

//NOTE: handle routes
import odmRoutes from './routes/odm-methods.js';
app.use('/api', odmRoutes);
import crudRoutes from './routes/crud.js';
app.use('/api', crudRoutes);
import mvcRoutes from './routes/mvc.js';
app.use('/api', mvcRoutes);
import modelRelationsRoutes from './routes/model-relations.js';
app.use('/api', modelRelationsRoutes);

// NOTE: handle errors
import { logErrors } from './middleware/error-handling.js';
app.use(logErrors);
import { invalidPath } from './middleware/error-handling.js';
app.use(invalidPath);
import { handleClientErrors } from './middleware/error-handling.js';
app.use(handleClientErrors);
import { handleErrors } from './middleware/error-handling.js';
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
