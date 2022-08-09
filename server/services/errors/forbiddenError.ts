import { IStatus } from './status';
export class ForbiddenError extends Error implements IStatus {
    statusCode: number;
    constructor(message?: string) {
        super(message || "You're missing permission to execute this request.");
        this.statusCode = 403;
    }
}