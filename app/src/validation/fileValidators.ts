import Joi from 'joi';

export const avatarValidSchema = Joi.object({
  fieldname: Joi.string(), // 'avatar'

  originalname: Joi.string(), // 'myPhoto.jpg',
  encoding: Joi.string(), // '7bit',
  mimetype: Joi.string(), // 'image/jpeg',
  destination: Joi.string(), // '/app/tmp',
  filename: Joi.string(), // '1741423114273_myPhoto.jpg',

  path: Joi.string(), // '/app/tmp/1741423114273_myPhoto.jpg',
  size: Joi.number(), // 753624,
});
