import Joi from 'joi';
import { IController } from '../interfaces/interface_controlers';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const';

export const validateAvatar =
  (schema: Joi.ObjectSchema): IController =>
  async (req, res, next) => {
    const avatar = req.file;
    try {
      await schema.validateAsync(avatar, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        next(new UnprocessableEntityError(error.message));
      } else {
        next(new InternalServerError());
      }
    }
  };
