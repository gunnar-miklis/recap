import express from 'express';
import connectDB from './db/config.js';
import requestLogger from 'morgan';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger('dev'));

connectDB();

app.get('/api', (req, res, next) => {
	res.json({ message: 'Application running.' });
});

import mvcCrudRoutes from './routes/mvc-crud.js';
app.use('/api', mvcCrudRoutes);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
