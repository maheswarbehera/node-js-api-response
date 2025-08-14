import { NextFunction } from "express";
import { errorCodeToClassMap } from "../utils/errorMap";
import BaseError from "./BaseError";

/**
 * Represents an HTTP-specific error with a status code.
 * Extend this for specific HTTP error types (e.g., NotFoundError, UnauthorizedError).
 */
export default class HttpErrorResponse<T = any> extends BaseError<T> {
    constructor(
        statusCode: number = 500,
        message: string = 'Internal server error',
        errorCode?: string
    ) {
        super(statusCode, message, errorCode);
    }
}


/**
 * Helper function to create and forward an HttpError to the next middleware.
 *
 * @param next - The Express next function to pass the error to.
 * @param statusCode - The HTTP status code for the error.
 * @param message - The error message. Defaults to 'Internal server error'.
 * @throws {HttpError} If next is not a function, throws the created HttpError.
 */
export const ErrorResponse = <T>(
    next: NextFunction,
    statusCode: number,
    message: string = 'Internal server error',
    errorCode?: string,
): void => {

    let error: Error;

    if (errorCode && errorCodeToClassMap[errorCode]) {
        const ErrorClass = errorCodeToClassMap[errorCode];
        error = new ErrorClass(message);
    } else {
        error = new HttpErrorResponse(statusCode, message, errorCode);
    }

    if (typeof next === 'function') {
        next(error);
    } else {
        throw error;
    }
};