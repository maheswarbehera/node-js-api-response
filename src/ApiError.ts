import { NextFunction } from 'express';

/**
 * Represents a custom API error with an HTTP status code and a boolean status.
 * Extends the built-in Error class to provide additional context for API responses.
 * @template T - Type of additional details included with the error.
*/
export class ApiError<T = any> extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    public statusCode: number;

    /**
     * Indicates the status of the response (false for all errors).
     */
    public status: boolean = false;

    /**
     * Optional error code for more specific error identification.
     */
    public errorCode?: string;


    /**
     * Creates an instance of ApiError.
     *
     * @param statusCode - The HTTP status code for the error.
     * @param message - The error message. Defaults to 'Internal server error'.
     * @param errorCode - Optional error code for more specific error identification. 
     */
    constructor(statusCode: number, message: string = 'Internal server error', errorCode?: string) {
        super(message);
        this.statusCode = statusCode; 
        this.name = this.constructor.name;
        this.errorCode = errorCode; 

        // Maintains proper stack trace (only needed in V8 environments)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/**
 * Helper function to create and forward an ApiError to the next middleware.
 *
 * @param statusCode - The HTTP status code for the error.
 * @param message - The error message. Defaults to 'Internal server error'.
 * @param next - The Express next function to pass the error to.
 * @throws {ApiError} If next is not a function, throws the created ApiError.
 */
export const ErrorResponse = <T>(
    statusCode: number,
    message: string = 'Internal server error',
    next: NextFunction,
    errorCode?: string, 
): void => {
    const error = new ApiError<T>(statusCode, message, errorCode);
    if (typeof next === 'function') {
        next(error);
    } else {
        throw error;
    }
};
