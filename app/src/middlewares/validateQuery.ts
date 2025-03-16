import Joi from 'joi';

import { IController } from '../interfaces/interface_controlers.ts';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const.ts';

export const validateQuery =
  (schema: Joi.ObjectSchema): IController =>
  async (req, res, next) => {
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        next(new UnprocessableEntityError(error.message));
      } else {
        next(new InternalServerError());
      }
    }
  };
