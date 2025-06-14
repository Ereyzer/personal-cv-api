import Joi from 'joi';
import { Express } from 'express';
import { InternalServerError, UnprocessableEntityError } from '../config/err-const.ts';
import { IVadatorMiddlware } from '../interfaces/interfaces_middlwares.ts';

export const validateAvatar: IVadatorMiddlware = schema => async (req, res, next) => {
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

export const validateIcon: IVadatorMiddlware = schema => async (req, res, next) => {
  const icons: Express.Multer.File[] = req.files as Express.Multer.File[];
  try {
    const validations: Promise<Express.Multer.File>[] = [];
    for (let i = 0; i < icons.length; i++) {
      validations[i] = schema.validateAsync(icons[i]);
    }
    await Promise.all(validations);
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(new UnprocessableEntityError(error.message));
    } else {
      next(new InternalServerError());
    }
  }
};
