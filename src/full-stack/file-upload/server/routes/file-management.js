import express from 'express';
import { authorization } from '../mw/authorization.js';

// Router instance
const router = express.Router();

router.post('/upload', authorization, (req, res, next) => {
  try {
    // request body
    return;
  } catch (error) {
    next(error);
  }
});

export default router;
