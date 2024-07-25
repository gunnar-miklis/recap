import express from 'express';
import { authorization } from '../mw/authorization';

// Router instance
const router = express.Router();

app.post('/upload', authorization, (req, res, next) => {
  try {
    // request body
  } catch (error) {
    next(error);
  }
});

export default router;
