import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryError } from '../mw/handleErrors.js';

// NOTE: multer is a middleware and parses the multipart/form-data and makes it accessible for further processing
const imgStorage = multer.memoryStorage();
export const formParser = multer({ storage: imgStorage });

// NOTE: cloudinary configs/params
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function cloudinaryParams(username) {
  return {
    resource_type: 'image',
    // allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    format: 'webp',
    folder: 'user-avatars',
    tags: [username, 'avatar'],
    public_id: `${username}-avatar`,
  };
}

// NOTE: cloudinary transaction methods
// .upload_stream(): for files sent via form, reading the buffer exposed by multer middleware parser
export async function cloudinaryUploadStream(inputFile, username) {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(cloudinaryParams(username), (error, result) => {
          if (result) resolve(result);
          else reject(error);
        })
        .end(inputFile.buffer);
    });
    return uploadResult;
  } catch (error) {
    throw new CloudinaryError('got file but not uploaded');
  }
}

// .upload(): for absolute pathes like a specifc url or a local path ../assets/image.png
export async function cloudinaryUploadImage(inputFile, username) {
  try {
    return await cloudinary.uploader.upload(inputFile, cloudinaryParams(username));
  } catch (error) {
    throw new CloudinaryError('got file but not uploaded');
  }
}

// .destroy(): for deleting images
export async function cloudinaryRemoveImage(publicId) {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new CloudinaryError('image not removed');
  }
}
