import express from 'express';
const router = express.Router();
import StudentModel from '../db/schema-model.js';

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

// mock data
const bob = new StudentModel({
	name: 'Bob',
	age: 27,
	lang: ['en', 'de'],
});
const mara = new StudentModel({
	name: 'Mara',
	age: 29,
	lang: ['en', 'de', 'fr'],
	enrolled: true,
});
// manually seeding DB
// (async () => {
// 	const resultBob = await StudentModel.create(bob);
// 	console.log('resultBob :>> ', resultBob);
// 	const resultMara = await StudentModel.create(mara);
// 	console.log('resultMara :>> ', resultMara);
// })();


// READ all
// This CONTROLLER, gets a "request" and...
router.get('/students', async (req, res, next) => {
	try {
		// ...asks for data from the MODEL...
		const students = await StudentModel.find();
		// ..."responds" by sending data to the VIEW (client).
		res.status(200).json({ students });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// CREATE
router.post('/students/add', async (req, res, next) => {
	const reqBody = req.body;
	console.log(reqBody);

	try {
		const resultBob = await StudentModel.create(bob);
		console.log('resultBob :>> ', resultBob);
		const resultMara = await StudentModel.create(mara);
		console.log('resultMara :>> ', resultMara);
		res.status(200).json({
			message: `${bob.name} and ${mara.name} added.`,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// READ one
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

// UPDATE
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

// DELETE
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

export default router;
