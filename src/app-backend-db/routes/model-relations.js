import express from 'express';
const router = express.Router();
import { StudentModel, CampusModel } from '../db/schema-model.js';
import CustomError from '../middleware/CustomError.js';

router.get('/campuses/:name', async (req, res, next) => {
	const { name } = req.params;

	try {
		const campus = await CampusModel.findOne({ city: name });
		if (!campus) {
			throw new CustomError('This campus does not exist', 400);
		}
		res.status(200).json({ campus });
	} catch (err) {
		next(err);
	}
});

router.get('/campuses', async (req, res, next) => {
	try {
		const campus = await CampusModel.find({});
		if (!campus) {
			throw new CustomError('No campus in database', 400);
		}
		res.status(200).json({ campus });
	} catch (err) {
		next(err);
	}
});

export default router;
