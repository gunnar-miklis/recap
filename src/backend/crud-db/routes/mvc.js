import express from 'express';
const router = express.Router();
import { StudentModel } from '../db/schema-model.js';

// NOTE: Model-View-Controller (MVC), Response-Request-Cylce
//	1. client -> REQUEST -> controller
//	2. controller -> model -> db
//	3. db -> model -> controller
//	4. contoller -> view
//	5. view -> RESPONSE -> client

// NOTE: READ all + sort them by names + populate campus name
// MVC: This CONTROLLER, gets a "request" and...
router.get('/students', async (req, res, next) => {
	try {
		// MVC: ...asks for data from the MODEL...
		const students = await StudentModel.find()
			.sort({ name: 1 })
			.populate({ path: 'campus', select: 'city' });
		// MVC: ..."responds" by sending data to the VIEW (client).
		res.status(200).json(
			!students.length ? { message: 'Database is empty.' } : { students },
		);
	} catch (err) {
		next(err);
	}
});

export default router;
