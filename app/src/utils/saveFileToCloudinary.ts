import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';
import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from '../config/constants.ts';
import { InternalServerError } from '../config/err-const.ts';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});
export const saveAvatarToCloudinary = async (fileObj: Express.Multer.File): Promise<string> => {
  try {
    await cloudinary.uploader
      .upload(fileObj.path, {
        public_id: 'avatar',
      })
      .catch(e => {
        console.log(e);
      });
    const optimizeUrl = cloudinary.url('avatar', {
      transformation: [{ fetch_format: 'auto', quality: 'auto' }, { width: 400 }],
    });

    return optimizeUrl;
  } catch (e) {
    throw new InternalServerError((e as Error).message);
  }
};
export const saveImageToCloudinary = async (
  fileObj: Express.Multer.File,
  public_id: string
): Promise<string> => {
  try {
    const url = await cloudinary.uploader
      .upload(fileObj.path, {
        public_id,
        invalidate: true,
      })
      .then(response => {
        return response.secure_url;
      })
      .catch(e => {
        console.log(e);
      });
    if (!url) {
      throw new InternalServerError('problem with img db');
    }

    return url;
  } catch (e) {
    throw new InternalServerError((e as Error).message);
  }
};

export const removeImageFromCloudinary = async (public_id: string) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id, resp => {
      return resp;
    });
    return response;
  } catch {
    throw new InternalServerError('problem with img db');
  }
};
