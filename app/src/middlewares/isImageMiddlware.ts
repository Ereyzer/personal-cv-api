import { NextFunction, RequestHandler } from 'express';
import { IController } from '../interfaces/interface_controlers.ts';

export const isImageMiddllware = (upload: RequestHandler, validate: IController): IController => {
  const controller: IController = async (req, res, next): Promise<void> => {
    const body = req.body as unknown as { withImage: boolean };

    if (!body.withImage) {
      next();
      return;
    }

    const myNext: NextFunction = err => {
      if (!err) {
        validate(req, res, next);
        return;
      }
      throw new Error(err.message);
    };
    upload(req, res, myNext);
    return;
  };
  return controller;
};
