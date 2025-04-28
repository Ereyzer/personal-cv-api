import { HttpCode } from "./constants.js";
class CError extends Error {
    status;
    constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
    }
}
const makeError = (defoultMessage, defoultName, defoultStatus) => {
    return class extends CError {
        constructor(message) {
            super(message || defoultMessage, defoultName, defoultStatus);
        }
    };
};
export const InternalServerError = makeError('Something went wrong', 'INTERNAL SERVER ERROR', HttpCode.INTERNAL_SERVER_ERROR);
export const NotFoundError = makeError('Not Found', 'NOT FOUND', HttpCode.NOT_FOUND);
export const UnprocessableEntityError = makeError('Validation Error', 'UNPROCESSABLE ENTITY', HttpCode.UNPROCESSABLE_ENTITY);
export const BadRequest = makeError('Bad Request', 'BAD REQUEST', HttpCode.BAD_REQUEST);
