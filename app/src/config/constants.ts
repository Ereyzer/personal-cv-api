import path from 'path';

// ENV names
export const varsEnv = {
  MONGODB: 'MONGODB',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_PORT: 'MONGODB_PORT',
  MONGODB_DB: 'MONGODB_DB',
  APP_HOST: 'APP_HOST',
  MONGODB_HOST: 'MONGODB_HOST',
  MONGODB_URL: 'MONGODB_URL',
};

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export const __dirname: string = path.dirname(process.argv[1]);

export const TMP_UPLOAD_DIR: string = path.join(__dirname, '../', 'tmp');
export const UPLOAD_DIR: string = path.join(__dirname, '../', 'upload');
