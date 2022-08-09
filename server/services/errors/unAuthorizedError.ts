import { IStatus } from './status';
export class UnAuthorizedError extends Error implements IStatus {
    statusCode: number;
    constructor(message?: string) {
        super(message || "Authentication credentials not valid.");
        this.statusCode = 401;
    }
}

