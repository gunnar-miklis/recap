import express from 'express';
import { connectDB } from './db/config.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res, next) => {
	res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
