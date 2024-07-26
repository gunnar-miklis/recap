import express from 'express';
const router = express.Router();
import { StudentModel } from '../db/schema-model.js';
import CustomError from '../middleware/CustomError.js';

// NOTE: Object Document Mapper (ODM) to perform CRUD operations
//	* Create: Model.create(),
//	* Read: Model.find(), Model.findOne(), Model.findById()
//	* Update: Mode.updatedOne(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
//	* Delete: Model.deleteOne(), Model.findByIdAndDelete()

// TESTING: can use "Thunder Client" Extension to mock GET/POST/PUT/DELETE requests

// NOTE: CREATE one
// => http://localhost:3000/api/students/new
router.post('/students', async (req, res, next) => {
  const newStudent = req.body;
  const { name } = newStudent;

  try {
    // check if already in database
    const isAlreadyInDB = await StudentModel.findOne({ name });
    if (isAlreadyInDB) {
      throw new CustomError(`${name} is already in Database.`, 400);
    }

    const createdStudent = await StudentModel.create(newStudent);
    res.status(200).json({ message: `${createdStudent.name} added.` });
  } catch (err) {
    next(err);
  }
});

// NOTE: READ one
// => http://localhost:3000/api/students/66198242d1212989b53ff763
router.get('/students/:studentID', async (req, res, next) => {
  const { studentID } = req.params;

  try {
    const student = await StudentModel.findById(studentID).populate({
      path: 'campus',
      select: 'city',
    });
    if (!student) {
      throw new CustomError('Student not found', 400, 'check if ID is correct');
    }
    res.status(200).json({ student });
  } catch (err) {
    next(err);
  }
});

// NOTE: UPDATE one
router.put('/students/:studentID', async (req, res, next) => {
  const { studentID } = req.params;
  const updates = req.body;

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(studentID, updates, { new: true });
    if (!updatedStudent) {
      throw new CustomError('Student not found', 400, 'check if ID is correct');
    }
    res.status(200).json({ updatedStudent });
  } catch (err) {
    next(err);
  }
});

// NOTE: DELETE one
router.delete('/students/:studentID', async (req, res, next) => {
  const { studentID } = req.params;

  try {
    const isDeleted = await StudentModel.findByIdAndDelete(studentID);
    if (!isDeleted) {
      throw new CustomError('Student not found', 400, 'check if ID is correct');
    }
    res.status(200).json({ message: `Student ${studentID} deleted.` });
  } catch (err) {
    next(err);
  }
});

export default router;
