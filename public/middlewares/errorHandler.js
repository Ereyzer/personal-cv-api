import { HttpCode } from "../config/constants.js";
export const errorHandler = (err, _req, res, _next) => {
    const { name = 'INTERNAL SERVER ERROR', message = 'Something went wrong', status = HttpCode.INTERNAL_SERVER_ERROR, } = err;
    res.status(status).json({
        status,
        name,
        message,
    });
};
