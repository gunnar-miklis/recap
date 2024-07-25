import express from 'express';
const router = express.Router();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

import { UserModel } from '../db/schema.js';
import { hasJWTAuth } from '../mw/hasJWTAuth.js';

// NOTE: add new users
router.post('/auth/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validation 1
    if (!username || !password) throw new Error('Provide a username and a password');

    // validation 2
    const pwRequirements = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/g);
    const pwValid = pwRequirements.test(password);
    if (!pwValid) throw new Error('PW needs: number, uppercase, lowercase, 6 characters');

    // validation 3
    const alreadyExists = await UserModel.findOne({ username });
    if (alreadyExists) throw new Error('Username already exist');

    // create new user
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({ username, password: hash });

    // response: message
    res.status(200).json({ message: `${newUser.username} created.` });
  } catch (error) {
    next(error);
  }
});

// NOTE: login / giveToken = create JWT Token and sent to client
//	* client saves the token (local storage, memory, etc)
//	* client needs to send the token on each request (to a protected route)
router.post('/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validation 1
    if (!username || !password) throw new Error('Provide a username and a password');

    // validation 2
    const foundUser = await UserModel.findOne({ username });
    if (!foundUser) throw new Error('User does not exist');

    // validation 3
    const isPwCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!isPwCorrect) throw new Error('Wrong credentials');

    // create jwt
    const payload = { username: foundUser.username }; // COMMENT: has to be an object
    const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '3m',
    });

    // response: sent token
    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});

router.get('/auth/verify', hasJWTAuth, async (req, res, next) => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error);
  }
});

export default router;
