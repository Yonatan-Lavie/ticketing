import { CustomError } from './custom-error';

export class NotAuthirizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not Authotized');

        Object.setPrototypeOf(this, NotAuthirizedError.prototype);
    }
    serializeErrors() {
        return [{message: 'Not Authorized'}];
    }
}