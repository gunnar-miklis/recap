import express from 'express';
const router = express.Router();
import StudentModel from '../db/schema-model.js';

// NOTE: READ with "count-utility"
// => http://localhost:3000/api/students/count
router.get('/students/count', async (req, res, next) => {
	try {
		const studentCount = await StudentModel.countDocuments();
		res.status(200).json({
			message: `There are currently ${studentCount} students in the database.`,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: READ filtered
// => http://localhost:3000/api/students/enrolled
router.get('/students/enrolled', async (req, res, next) => {
	try {
		const enrolledStudents = await StudentModel.find({ enrolled: true });
		res.status(200).json({ enrolledStudents });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: READ by query
// => http://localhost:3000/api/students/search?lang=de
router.get('/students/search', async (req, res, next) => {
	const searchQuery = req.query;

	// handle empty query
	const { lang } = searchQuery;
	if (!lang) {
		res.status(400).json({ message: 'No search query provided.' });
		return;
	}

	try {
		const searchResult = await StudentModel.find(searchQuery);

		// handle "nothing found"
		if (!searchResult.length) {
			res.status(200).json({
				message: 'None of the students knows this language.',
			});
			return;
		}

		res.status(200).json({ searchResult });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});
export default router;
