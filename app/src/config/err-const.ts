import { HttpCode } from './constants.ts';

export interface IError extends Error {
  message: string;
  name: string;
  status: HttpCode;
}

class CError extends Error implements IError {
  status: HttpCode;
  constructor(message: string, name: string, status: HttpCode) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

const makeError = (
  defoultMessage: string,
  defoultName: string,
  defoultStatus: HttpCode
): new (message?: string) => IError => {
  return class extends CError {
    constructor(message?: string) {
      super(message || defoultMessage, defoultName, defoultStatus);
    }
  };
};
export const InternalServerError = makeError(
  'Something went wrong',
  'INTERNAL SERVER ERROR',
  HttpCode.INTERNAL_SERVER_ERROR
);

export const NotFoundError = makeError('Not Found', 'NOT FOUND', HttpCode.NOT_FOUND);

export const UnprocessableEntityError = makeError(
  'Validation Error',
  'UNPROCESSABLE ENTITY',
  HttpCode.UNPROCESSABLE_ENTITY
);

export const BadRequest = makeError('Bad Request', 'BAD REQUEST', HttpCode.BAD_REQUEST);
