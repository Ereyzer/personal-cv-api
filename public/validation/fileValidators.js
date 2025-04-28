import Joi from 'joi';
export const avatarValidSchema = Joi.object({
    fieldname: Joi.string().pattern(new RegExp('^avatar$')).required(), // 'avatar'
    originalname: Joi.string()
        .pattern(new RegExp(/^[^\s+]+.(jpe?g|png|bmp|webp)$/))
        .required(), // 'myPhoto.jpg',
    encoding: Joi.string().required(), // '7bit',
    mimetype: Joi.string().required(), // 'image/jpeg',
    destination: Joi.string().required(), // '/app/tmp',
    filename: Joi.string().required(), // '1741423114273_myPhoto.jpg',
    path: Joi.string().required(), // '/app/tmp/1741423114273_myPhoto.jpg',
    size: Joi.number().required(), // 753624,
});
export const iconValidSchema = Joi.object({
    fieldname: Joi.string().pattern(new RegExp('^icons$')).required(),
    originalname: Joi.string()
        .pattern(new RegExp(/^[^\s+]+.svg$/))
        .required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required(),
});
