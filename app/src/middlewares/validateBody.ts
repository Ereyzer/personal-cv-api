import Joi from 'joi';
import { IController } from '../interfaces/interface_controlers.ts';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const.ts';

export const validateBody =
  (schema: Joi.ObjectSchema): IController =>
  async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        // console.error('Помилка валідації:', error.details);
        next(new UnprocessableEntityError(error.message));
      } else {
        // console.error('Неочікувана помилка:', error);
        next(new InternalServerError());
      }
    }
  };
