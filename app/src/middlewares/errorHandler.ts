import { NextFunction, Request, Response } from 'express';
import { IError } from '../config/err-const.ts';
import { HttpCode } from '../config/constants.ts';

type HandlerFunc = (err: IError, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: HandlerFunc = (err, _req, res, _next) => {
  const {
    name = 'INTERNAL SERVER ERROR',
    message = err.message || 'Something went wrong',
    status = HttpCode.INTERNAL_SERVER_ERROR,
  } = err;

  res.status(status).json({
    status,
    name,
    message,
  });
};
