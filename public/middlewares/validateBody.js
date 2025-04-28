import Joi from 'joi';
import { InternalServerError, UnprocessableEntityError } from "../config/err-const.js";
export const validateBody = (schema) => async (req, _res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        if (error instanceof Joi.ValidationError) {
            // console.error('Помилка валідації:', error.details);
            next(new UnprocessableEntityError(error.message));
        }
        else {
            // console.error('Неочікувана помилка:', error);
            next(new InternalServerError());
        }
    }
};
