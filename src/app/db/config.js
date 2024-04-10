import mongoose from 'mongoose';

export async function connectDB() {
	const dbURI = 'mongodb://127.0.0.1/refresh-db';

	try {
		mongoose.connect(dbURI);
	} catch (err) {
		console.error(err.message);
	}

	const db = mongoose.connection;
	db.once('open', () => {
		console.log(`Database connected: ${dbURI}`);
	});

	db.on('error', (err) => {
		console.error(`connection error: ${err}`);
	});
	
	return;
}
