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
  console.log('cloudinary');

  try {
    await cloudinary.uploader
      .upload(fileObj.path, {
        public_id: 'avatar',
      })
      .catch(e => {
        console.log(e);
      });
    const optimizeUrl = cloudinary.url('avatar', {
      // fetch_format: 'auto',
      // quality: 'auto',
      transformation: [{ fetch_format: 'auto', quality: 'auto' }, { width: 400 }],
    });
    console.log('good');

    return optimizeUrl;
  } catch (e) {
    console.log('bad');

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
// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: 'dtvlyktjs',
//     api_key: '479926986855862',
//     api_secret: '<your_api_secret>', // Click 'View API Keys' above to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//       public_id: 'shoes',
//     })
//     .catch(error => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto',
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();
