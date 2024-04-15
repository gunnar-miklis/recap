import express from 'express';
const router = express.Router();
import StudentModel from '../db/schema-model.js';

// TESTING: with mock data, and some edge cases
// TESTING: can use "Thunder Client" Extension to mock POST/PUT/DELETE requests
const students = [
	{
		name: 'bob', // => first letter will be capitalized
		age: 27,
		lang: ['en', 'de'],
	},
	{
		name: 'mara',
		age: 29,
		lang: ['en', 'de', 'pt'],
		enrolled: false,
	},
	{
		name: 'HARU', // => will be capitalized
		age: 26,
		lang: ['en', 'jp'],
		enrolled: true,
	},
	{
		name: 'Ahmed',
		age: 28,
		lang: ['  EN      '], // => will be trimmed and lowercased and validated
		enrolled: true,
	},
];

// NOTE: Object Document Mapper (ODM) to perform CRUD operations
//	* Create: Model.create(),
//	* Read: Model.find(), Model.findOne(), Model.findById()
//	* Update: Mode.updatedOne(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
//	* Delete: Model.deleteOne(), Model.findByIdAndDelete()

// NOTE: CREATE one
// => http://localhost:3000/api/students/new
router.post('/students/new', async (req, res, next) => {
	const newStudent = req.body;
	const { name } = newStudent;

	try {
		// check if already in database
		const isAlreadyInDB = await StudentModel.find({ name });
		if (isAlreadyInDB.length) {
			return res.status(400).json({
				message: `${name} is already in Database.`,
			});
		}

		const createdStudent = await StudentModel.create(newStudent);
		res.status(200).json({
			message: `${createdStudent.name} added.`,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: READ one
// => http://localhost:3000/api/students/66198242d1212989b53ff763
router.get('/students/:studentID', async (req, res, next) => {
	const { studentID } = req.params;

	try {
		const student = await StudentModel.findById(studentID);
		res.status(200).json({ student });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: UPDATE one
router.put('/students/:studentID', async (req, res, next) => {
	const { studentID } = req.params;
	const updates = req.body;

	try {
		const updatedStudent = await StudentModel.findByIdAndUpdate(
			studentID,
			updates,
			{ new: true },
		);
		res.status(200).json({ updatedStudent });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: DELETE one
router.delete('/students/:studentID', async (req, res, next) => {
	const { studentID } = req.params;

	try {
		const isDeleted = await StudentModel.findByIdAndDelete(studentID);
		if ( !isDeleted ) {
			return res.status(400).json({ message: `Student not found.` });
		}
		res.status(200).json({ message: `Student ${studentID} deleted.` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

export default router;