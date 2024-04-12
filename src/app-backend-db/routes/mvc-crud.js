import express from 'express';
const router = express.Router();
import StudentModel from '../db/schema-model.js';

// TESTING: with mock data, and some edge cases
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

// NOTE: Model-View-Controller (MVC), Response-Request-Cylce
//	1. client -> REQUEST -> controller
//	2. controller -> model -> db
//	3. db -> model -> controller
//	4. contoller -> view
//	5. view -> RESPONSE -> client

// NOTE: Object Document Mapper (ODM) to perform CRUD operations
//	* Create: Model.create(),
//	* Read: Model.find(), Model.findOne(), Model.findById()
//	* Update: Mode.updatedOne(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
//	* Delete: Model.deleteOne(), Model.findByIdAndDelete()

// NOTE: READ filtered
// MVC: This CONTROLLER, gets a "request" and...
router.get('/students/enrolled', async (req, res, next) => {
	try {
		// MVC: ...asks for data from the MODEL...
		const enrolledStudents = await StudentModel.find({ enrolled: true });
		// MVC: ..."responds" by sending data to the VIEW (client).
		res.status(200).json({ enrolledStudents });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: READ with "count-utility"
router.get('/students/count', async (req, res, next) => {
	try {
		const studentCount = await StudentModel.countDocuments()
		res.status(200).json({
			message: `There are currently ${studentCount} students in the database.`,
		});
	}catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
})

// NOTE: CREATE one
router.post('/students/new', async (req, res, next) => {
	const newStudent = req.body;
	const { name } = newStudent;

	try {
		// check if already in database
		const isAlreadyInDB = await StudentModel.find({ name });
		if (isAlreadyInDB.length) {
			res.status(400).json({
				message: `${name} already in Database.`,
			});
			return;
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
		await StudentModel.findByIdAndDelete(studentID);
		res.status(200).json({ message: `Student ${studentID} deleted.` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// NOTE: READ all, and sort them by names
router.get('/students', async (req, res, next) => {
	try {
		const students = await StudentModel.find().sort({ name: 1 });
		res.status(200).json(
			!students.length ? { message: 'Database is empty.' } : { students },
		);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

export default router;
