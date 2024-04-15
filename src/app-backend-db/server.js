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

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
