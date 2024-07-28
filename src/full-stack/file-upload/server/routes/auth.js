import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authorization } from '../mw/authorization.js';
import { UserModel } from '../db/schema.js';

const saltRounds = 10;
const passwordRequirements = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/);

// Router instance
const router = express.Router();

router.post('/auth/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validation 1: provide username/password
    if (!username || !password) throw new Error('Provide username and password');

    // validation 2: password requirements
    const isPwValid = passwordRequirements.test(password);
    if (!isPwValid) throw new Error('PW does not match requirements');

    // validation 3: username already exist
    const alreadyExist = await UserModel.findOne({ username });
    if (alreadyExist) throw new Error('Username already exist');

    // database: new user
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({ username, password: hash });
    if (!newUser) throw new Error('Database failed to create new user');

    // response: sent success message
    res.status(201).json({ message: `'${newUser.username}' created` });
  } catch (error) {
    next(error);
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validation 1: provide username/password
    if (!username || !password) throw new Error('Provide username and password');

    // validation 2: wrong credentials: user not found
    const foundUser = await UserModel.findOne({ username });
    if (!foundUser) throw new Error('Wrong credentials');

    // validation 3: wrong credentials: wrong password
    const isPwCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!isPwCorrect) throw new Error('Wrong credentials');

    // create JWT
    const payload = { userId: foundUser._id, username: foundUser.username, role: 'Guest' };
    const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '10m',
    });

    // response: sent token
    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});

router.get('/auth/verify', authorization, async (req, res, next) => {
  try {
    const { userId, username, role, iat, exp } = req.payload;

    // response: sent username and role
    res.status(200).json({ userId, username, role, iat, exp });
  } catch (error) {
    next(error);
  }
});

export default router;
