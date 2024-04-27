import express from 'express';
const router = express.Router();
import UserModel from '../db/schema.js';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

// NOTE: CREATE one
router.post('/users', async (req, res, next) => {
	const { username, password: plainPassword } = req.body;

	try {
		// check if already in database
		const isAlreadyInDB = await UserModel.findOne({ username });
		if (isAlreadyInDB) {
			throw new Error(`${username} is already in Database.`, {
				cause: '400',
			});
		}

		// encrypt password
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(plainPassword, salt);
		const createdUser = await UserModel.create({
			username,
			password: hash,
		});

		res.status(200).json({ message: `${createdUser.username} added.` });
	} catch (err) {
		next(err);
	}
});

// NOTE: READ one
router.get('/users/:userID', async (req, res, next) => {
	const { userID } = req.params;

	try {
		const user = await UserModel.findById(userID);
		if (!user) {
			throw new Error('User not found', { cause: '400' });
		}
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
});

// NOTE: UPDATE one
router.put('/users/:userID', async (req, res, next) => {
	const { userID } = req.params;
	const updates = req.body;

	try {
		const updatedUser = await UserModel.findByIdAndUpdate(userID, updates, {
			new: true,
		});
		if (!updatedUser) {
			throw new Error('User not found', { cause: '400' });
		}
		res.status(200).json({ updatedUser });
	} catch (err) {
		next(err);
	}
});

// NOTE: DELETE one
router.delete('/users/:userID', async (req, res, next) => {
	const { userID } = req.params;

	try {
		const isDeleted = await UserModel.findByIdAndDelete(userID);
		if (!isDeleted) {
			throw new Error('User not found', { cause: '400' });
		}
		res.status(200).json({ message: `${userID} deleted.` });
	} catch (err) {
		next(err);
	}
});

// NOTE: READ all
router.get('/users', async (req, res, next) => {
	try {
		const users = await UserModel.find({});
		res.status(200).json(
			!users.length ? { message: 'Database is empty.' } : { users },
		);
	} catch (err) {
		next(err);
	}
});

export default router;
