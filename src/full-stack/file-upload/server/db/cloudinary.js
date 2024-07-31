import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const imgStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    folder: 'user-avatars',
  },
});

export default multer({ imgStorage });
