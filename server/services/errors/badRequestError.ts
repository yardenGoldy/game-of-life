import { IStatus } from './status';
export class BadRequestError extends Error implements IStatus {
    statusCode: number;
    constructor(message?: string) {
        super(message || "Request has wrong format.");
        this.statusCode = 400;
    }
}

