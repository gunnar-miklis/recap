import mongoose from 'mongoose';

export default async function connectDB() {
	const dbURI = 'mongodb://127.0.0.1/refresh-dev';

	try {
		mongoose.connect(dbURI);
	} catch (err) {
		console.error(err.message);
	}

	const db = mongoose.connection;
	db.on('error', (err) => {
		console.error(`connection error: ${err}`);
	});
	db.on('connected', () => {
		console.log(`Database connected: ${dbURI}`);
	});
	db.on('disconnected', () => {
		console.log(`Database disconnected.`);
	});
	process.on('SIGINT', () => {
		db.close();
	});

	return;
}
