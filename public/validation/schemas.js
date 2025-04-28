import Joi from 'joi';
export const IdValidationSchema = Joi.object({
    _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message('must be an ObjectId'),
});
