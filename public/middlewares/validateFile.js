import Joi from 'joi';
import { InternalServerError, UnprocessableEntityError } from "../config/err-const.js";
export const validateAvatar = schema => async (req, res, next) => {
    const avatar = req.file;
    try {
        const test = await schema.validateAsync(avatar, { abortEarly: false });
        console.log(test);
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
export const validateIcon = schema => async (req, res, next) => {
    const icons = req.files;
    try {
        const validations = [];
        for (let i = 0; i < icons.length; i++) {
            validations[i] = schema.validateAsync(icons[i]);
        }
        await Promise.all(validations);
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
