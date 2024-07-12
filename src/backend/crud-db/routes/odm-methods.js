import express from 'express';
const router = express.Router();
import { StudentModel } from '../db/schema-model.js';
import CustomError from '../middleware/CustomError.js';

// NOTE: READ with "count-utility"
// .countDocuments()
// => http://localhost:3000/api/students/count
router.get('/students/count', async (req, res, next) => {
  try {
    const studentCount = await StudentModel.countDocuments();
    res.status(200).json({
      message: `There are currently ${studentCount || 0} students in the database.`,
    });
  } catch (err) {
    next(err);
  }
});

// NOTE: READ filtered
// .select()
// => http://localhost:3000/api/students/enrolled
router.get('/students/enrolled', async (req, res, next) => {
  try {
    const enrolledStudents = await StudentModel.find({ enrolled: true }).select('name');
    res
      .status(200)
      .json(
        enrolledStudents.length
          ? { enrolledStudents }
          : { message: 'There are currently no students enrolled.' },
      );
  } catch (err) {
    next(err);
  }
});

// NOTE: READ by query
// reqest query via GET
// => http://localhost:3000/api/students/search?lang=de
router.get('/students/search', async (req, res, next) => {
  const searchQuery = req.query;

  try {
    // handle empty query
    const { lang } = searchQuery;
    if (!lang) {
      throw new CustomError('No search query provided', 400, 'try use: ?lang=en');
    }

    const searchResult = await StudentModel.find(searchQuery);

    if (!searchResult.length) {
      throw new CustomError(
        'None of the students knows this language',
        200,
        'try another language code',
      );
    }

    res.status(200).json({ searchResult });
  } catch (err) {
    next(err);
  }
});

export default router;
