import express from 'express';
const router = express.Router();
import UserModel from '../db/schema.js';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

// NOTE: verify  user
router.post('/users/auth', async (req, res, next) => {
	const user = req.body;
	const { username, password: plainPassword } = user;

	try {
		// check if this user in database
		const foundUser = await UserModel.findOne({ username });
		if (!foundUser) {
			throw new Error(`${username} not found.`, { cause: '400' });
		}

		// compare hashes, authenticate
		const isVerified = bcrypt.compareSync(
			plainPassword,
			foundUser.password,
		);
		if (!isVerified) {
			throw new Error(`${foundUser.username} not verified.`, {
				cause: '400',
			});
		}

		res.status(200).json({ message: `${foundUser.username} is verified.` });
	} catch (err) {
		next(err);
	}
});

export default router;
