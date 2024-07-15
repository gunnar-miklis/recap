import express from 'express';
const router = express.Router();
import { CampusModel, UserModel } from '../db/schema.js';
import { hasJWT } from '../mw/hasJWT.js';

router.get('/campuses', hasJWT, async (req, res, next) => {
  try {
    const campuses = await CampusModel.find({}, { city: 1, _id: 0 });
    res.status(200).json(!campuses.length ? { message: 'Database is empty' } : { campuses });
  } catch (error) {
    next(error);
  }
});

router.delete('/delete', hasJWT, async (req, res, next) => {
  const { username } = req.body;
  try {
    const deletedUser = await UserModel.findOneAndDelete({ username: username });
    res.status(200).json({ message: `${deletedUser.username} deleted` });
  } catch (error) {
    next(error);
  }
});

export default router;
