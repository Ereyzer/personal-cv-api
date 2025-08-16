import Joi from 'joi';

const fileValidSchema = Joi.object({
  encoding: Joi.string().required(), // '7bit',
  mimetype: Joi.string().required(), // 'image/jpeg',
  destination: Joi.string().required(), // '/app/tmp',
  filename: Joi.string().required(), // '1741423114273_myPhoto.jpg',
  path: Joi.string().required(), // '/app/tmp/1741423114273_myPhoto.jpg',
  size: Joi.number().required(), // 753624,
});
export const avatarValidSchema = fileValidSchema.keys({
  fieldname: Joi.string().valid('avatar').required(), // 'avatar'
  originalname: Joi.string()
    .pattern(new RegExp(/^.+\.(jpe?g|png|bmp|webp)$/))
    .required(), // 'myPhoto.jpg',
});

export const iconValidSchema = fileValidSchema.keys({
  fieldname: Joi.string().valid('icons').required(),
  originalname: Joi.string()
    .pattern(new RegExp(/^[^\s+]+.svg$/))
    .required(),
});

export const resumeValidSchema = fileValidSchema.keys({
  fieldname: Joi.string().valid('resume').required(),
  originalname: Joi.string()
    .pattern(new RegExp(/\\*.pdf$/))
    .required(),
});
export const projectImageValidSchema = fileValidSchema.keys({
  fieldname: Joi.string().valid('image').required(),
  originalname: Joi.string()
    .pattern(new RegExp(/^.+\.(jpe?g|png|bmp|webp)$/))
    .required(),
});
