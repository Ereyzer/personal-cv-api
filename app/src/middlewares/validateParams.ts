import Joi from 'joi';
import { IController } from '../interfaces/interface_controlers.ts';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const.ts';

export const validateParams =
  (schema: Joi.ObjectSchema): IController =>
  async (req, _res, next) => {
    try {
      console.log(req.params);

      await schema.validateAsync(req.params, { abortEarly: false });

      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        next(new UnprocessableEntityError(error.message));
      } else {
        next(new InternalServerError());
      }
    }
  };
