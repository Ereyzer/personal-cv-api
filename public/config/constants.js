import path from 'path';
import { getEnvVar } from "../utils/getEnvVar.js";
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
};
export var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["ACCEPTED"] = 202] = "ACCEPTED";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["CONFLICT"] = 409] = "CONFLICT";
    HttpCode[HttpCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpCode[HttpCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (HttpCode = {}));
export const NODE_ENV = getEnvVar(varsEnv.NODE_ENV, 'prod');
export const PORT = Number(getEnvVar(varsEnv.APP_PORT, '3001'));
export const HOST = getEnvVar(varsEnv.APP_HOST, 'localhost');
export const __dirname = path.dirname(process.argv[1]);
export const TMP_UPLOAD_DIR = path.join(__dirname, '../', 'tmp');
export const UPLOAD_DIR = path.join(__dirname, '../', 'upload');
