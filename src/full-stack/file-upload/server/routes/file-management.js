import express from 'express';
import { authorization } from '../mw/authorization.js';
import { UserModel } from '../db/schema.js';
import fileUploader from '../db/cloudinary.js';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Router instance
const router = express.Router();

router.post('/upload', authorization, fileUploader.single('file'), async (req, res, next) => {
  try {
    const { username } = req.payload;
    console.log('username :>> ', username);
    const { file } = req;
    console.log('file :>> ', file);

    // const uploadResult = await cloudinary.uploader.upload(file.buffer, { resource_type: 'image', public_id: `${username}-avatar`});
    const uploadResult = await cloudinary.uploader
      .upload_stream((error, uploadResult) => {
		if ( error) throw new Error(error.message);
        return uploadResult;
      })
      .end(file.buffer);
    console.log('uploadResult :>> ', uploadResult);

    if (!file) throw new Error('Cloudinary: no file');
    else if (!file.path) throw new Error('Cloudinary: not uploaded');

    res.status(200).json({ avatarUrl: file.path });
  } catch (error) {
    next(error);
  }
});

router.post('/store', authorization, async (req, res, next) => {
  try {
    console.log('req.body :>> ', req.body);
    const { userId } = req.payload;
    const { avatarUrl } = req.body;

    if (!userId | !avatarUrl) throw new Error('userId or avatarUrl missing');

    // TODO: store db
    const updatedUser = UserModel.findOneAndUpdate(
      { _id: userId },
      { avatar: avatarUrl },
      { new: true },
    );
    console.log('updatedUser :>> ', updatedUser);

    res.status(200).json({ message: 'New profile picture saved!', avatarUrl: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
});

export default router;
