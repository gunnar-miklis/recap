import express from 'express';
import { CloudinaryError } from '../mw/handleErrors.js';
import { authorization } from '../mw/authorization.js';
import { cloudinaryRemoveImage, cloudinaryUploadStream, formParser } from '../db/cloudinary.js';
import { defaultAvatar, UserModel } from '../db/schema.js';

// router instance
const router = express.Router();

router.post('/upload', authorization, formParser.single('inputFile'), async (req, res, next) => {
  try {
    // get request data
    const { userId, username } = req.payload;
    const { file } = req;
    if (!file) throw new CloudinaryError('no file');

    // upload the requested image to cloudinary
    const uploadResult = await cloudinaryUploadStream(file, username);
    if (!uploadResult) throw new CloudinaryError('got file but not uploaded');

    // store the created cloudinary url in database
    const avatarUrl = uploadResult.secure_url;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true },
    );

    // response: sent url to update the current state immediately
    res.status(200).json({ message: 'New profile picture saved', avatar: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
});

router.delete('/delete', authorization, async (req, res, next) => {
  try {
    const { userId, username } = req.payload;

    // set cloudinary public_id
    const folder = 'user-avatars';
    const imageId = `${username}-avatar`;
	const publicId = `${folder}/${imageId}`;

    // delete file from cloudinary
    const deleteResult = await cloudinaryRemoveImage(publicId);
    if (!deleteResult || deleteResult.result !== 'ok') throw new CloudinaryError('not deleted');

    // update the database, reset avatar to default image
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: defaultAvatar },
      { new: true },
    );

    res.status(200).json({ message: 'Profil picture deleted', avatar: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
});

export default router;
