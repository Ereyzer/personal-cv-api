import { HttpCode } from './constants.ts';

export interface IError extends Error {
  message: string;
  name: string;
  status: HttpCode;
}

export class NotFoundError extends Error implements IError {
  constructor(message?: string) {
    super();
    this.message = message || 'Not Found';
  }
  name = 'NOT FOUND';
  status = HttpCode.NOT_FOUND;
}
export class InternalServerError extends Error implements IError {
  constructor(message?: string) {
    super();
    this.message = message || 'Something went wrong';
  }
  name = 'INTERNAL SERVER ERROR';
  status = HttpCode.INTERNAL_SERVER_ERROR;
}
