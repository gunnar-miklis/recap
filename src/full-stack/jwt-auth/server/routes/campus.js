import express from 'express';
const router = express.Router();
import { CampusModel } from '../db/schema.js';

router.get('/campus', async (req, res, next) => {
  try {
    const campuses = await CampusModel.find({},{city: 1, _id: 0});
    res.status(200).json(!campuses.length ? { message: 'Database is empty.' } : { campuses });
  } catch (err) {
    next(err);
  }
});

export default router;
