import path from 'path';
import { getEnvVar } from '../utils/getEnvVar.ts';

// ENV names
export const varsEnv = {
  MONGODB: 'MONGODB',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_PORT: 'MONGODB_PORT',
  MONGODB_DB: 'MONGODB_DB',
  APP_HOST: 'APP_HOST',
  APP_PORT: 'APP_PORT',
  NODE_ENV: 'NODE_ENV',
  MONGODB_HOST: 'MONGODB_HOST',
  MONGODB_URL: 'MONGODB_URL',
  CLOUDINARY_URL: 'CLOUDINARY_URL',
  CLOUDINARY_SECRET: 'CLOUDINARY_SECRET',
  CLOUDINARY_KEY: 'CLOUDINARY_KEY',
  CLOUDINARY_NAME: 'CLOUDINARY_NAME',
  SUPERUSER_EMAIL: 'SUPERUSER_EMAIL',
  SUPERUSER_PASSWORD: 'SUPERUSER_PASSWORD',
  AUTH_EMAIl: 'AUTH_EMAIL',
  AUTH_EMAIL_PASSWORD: 'AUTH_EMAIL_PASSWORD',
  JWT_SECRET: 'JWT_SECRET',
  APP_DOMAIN: 'APP_DOMAIN',
  SALT_ROUNDS_HASH: 'SALT_ROUNDS_HASH',
  ADMIN_DOMAIN: 'ADMIN_DOMAIN',
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

export const NODE_ENV: string = getEnvVar(varsEnv.NODE_ENV, 'development');

export const PORT: number = Number(getEnvVar(varsEnv.APP_PORT, '3001'));
export const HOST: string = getEnvVar(varsEnv.APP_HOST, 'localhost');
export const MONGO_URL = getEnvVar(varsEnv.MONGODB_URL);
export const DIR_NAME: string = path.dirname(process.cwd());

export const TMP_UPLOAD_DIR: string = path.join(DIR_NAME, 'tmp');
export const UPLOAD_DIR: string = path.join(DIR_NAME, 'upload');

export const CLOUDINARY_URL = getEnvVar(varsEnv.CLOUDINARY_URL);
export const CLOUDINARY_SECRET = getEnvVar(varsEnv.CLOUDINARY_SECRET);
export const CLOUDINARY_KEY = getEnvVar(varsEnv.CLOUDINARY_KEY);
export const CLOUDINARY_NAME = getEnvVar(varsEnv.CLOUDINARY_NAME);

export const SUPERUSER_EMAIL = getEnvVar(varsEnv.SUPERUSER_EMAIL);
export const SUPERUSER_PASSWORD = getEnvVar(varsEnv.SUPERUSER_PASSWORD);

export const AUTH_EMAIL = getEnvVar(varsEnv.AUTH_EMAIl);
export const AUTH_EMAIL_PASSWORD = getEnvVar(varsEnv.AUTH_EMAIL_PASSWORD);

// TODO: find another way to use files after build
export const TEMPLATES_DIR =
  NODE_ENV === 'dev'
    ? path.join(DIR_NAME, 'app', 'src', 'templates')
    : path.join(DIR_NAME, 'task', 'app', 'src', 'templates');

export const JWT_SECRET = getEnvVar(varsEnv.JWT_SECRET);
export const APP_DOMAIN = getEnvVar(varsEnv.APP_DOMAIN, 'http://localhost:3000/');
export const ADMIN_DOMAIN = getEnvVar(varsEnv.ADMIN_DOMAIN, 'http://localhost:5173');
export const SALT_ROUNDS_HASH = getEnvVar(varsEnv.SALT_ROUNDS_HASH, '2');

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
