import express from 'express';
const router = express.Router();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

import { UserModel } from '../db/schema.js';
import { hasJWT } from '../mw/hasJWT.js';

// NOTE: add new users
router.post('/auth/signup', async (req, res, next) => {
  const { username, password } = req.body;

  // validation 1
  if (!username || !password) {
    res.status(400).json({ message: 'Provide a username and a password.' });
    return;
  }

  // validation 2
  const pwRequirements = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/g);
  const pwValid = pwRequirements.test(password);
  if (!pwValid) {
    res.status(400).json({ message: 'PW needs: number, uppercase, lowercase, 6 characters.' });
    return;
  }

  try {
    // validation 3
    const alreadyExists = await UserModel.findOne({ username });
    if (alreadyExists) {
      res.status(400).json({ message: 'Username already exist.' });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await UserModel.create({ username, password: hash });

    res.status(200).json({ message: `${newUser.username} created.` });
  } catch (error) {
    next(error);
  }
});

// NOTE: login / giveToken = create JWT Token and sent to client
//	* client saves the token (local storage, memory, etc)
//	* client needs to send the token on each request (to a protected route)
router.post('/auth/login', async (req, res, next) => {
  const { username, password } = req.body;

  // validation 1
  if (!username || !password) {
    res.status(400).json({ message: 'Provide a username and a password.' });
    return;
  }

  try {
    const foundUser = await UserModel.findOne({ username });

    // validation 2
    if (!foundUser) {
      res.status(400).json({ message: 'User not found.' });
      return;
    }

    // validation 3
    const isPwCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!isPwCorrect) {
      res.status(400).json({ message: 'Wrong credentials.' });
      return;
    } else {
      const payload = foundUser.username;
      const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { algorithm: 'HS256' });
      res.status(200).json({ authToken });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/auth/verify', hasJWT, async (req, res, next) => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
});

export default router;
