import express from 'express';
const router = express.Router();
import { StudentModel, CampusModel } from '../db/schema-model.js';
import CustomError from '../middleware/CustomError.js';

router.get('/campuses/:name', async (req, res, next) => {
	const { name } = req.params;

	try {
		const campus = await CampusModel.findOne({ city: name }).populate(
			'students'
		);
		if (!campus) {
			throw new CustomError('This campus does not exist', 400);
		}
		if (!campus.students.length) {
			throw new CustomError(
				'There are no students enrolled at this campus',
				200,
			);
		}
		res.status(200).json({ campus });
	} catch (err) {
		next(err);
	}
});

router.get('/campuses', async (req, res, next) => {
	try {
		const campuses = await CampusModel.find({}).populate({
			path: 'students',
			model: StudentModel,
			select: ['name', 'enrolled'],
		});
		res.status(200).json(
			!campuses.length ? { message: 'Database is empty.' } : { campuses },
		);
	} catch (err) {
		next(err);
	}
});

export default router;
