import Joi from 'joi';
import { InternalServerError, UnprocessableEntityError } from "../config/err-const.js";
export const validateParams = (schema) => async (req, _res, next) => {
    try {
        await schema.validateAsync(req.params, { abortEarly: false });
        next();
    }
    catch (error) {
        if (error instanceof Joi.ValidationError) {
            next(new UnprocessableEntityError(error.message));
        }
        else {
            next(new InternalServerError());
        }
    }
};
