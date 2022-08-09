import { IStatus } from './status';
export class NotFoundError extends Error implements IStatus {
    statusCode: number;
    constructor(message?: string) {
        super(message || "object is not found");
        this.statusCode = 404;
    }
}