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

export class UnprocessableEntityError extends Error implements IError {
  constructor(message?: string) {
    super();
    this.message = message || 'Validation Error';
  }

  name: string = 'UNPROCESSABLE ENTITY';
  status: HttpCode = HttpCode.UNPROCESSABLE_ENTITY;
}

export class BadRequest extends Error implements IError {
  constructor(message?: string) {
    super();
    this.message = message || 'Bad Request';
  }

  name: string = 'BAD REQUEST';
  status: HttpCode = HttpCode.BAD_REQUEST;
}
