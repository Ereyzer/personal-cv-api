import Joi from 'joi';
import { InternalServerError, UnprocessableEntityError } from "../config/err-const.js";
export const validateQuery = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.query);
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
