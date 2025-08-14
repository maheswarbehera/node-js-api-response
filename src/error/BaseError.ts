import ErrorDefinitions, { ErrorKey } from '../utils/constants/error.constants';

/**
 * Represents a custom API error with an HTTP status code and a boolean status.
 * Extends the built-in Error class to provide additional context for API responses.
 * @template T - Type of additional details included with the error.
*/
export default class BaseError<T = any> extends Error {
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
     * Creates an instance of BaseError.
     *
     * @param statusCode - The HTTP status code for the error.
     * @param message - The error message. Defaults to 'Internal server error'.
     * @param errorCode - Optional error code for more specific error identification. 
     */
    constructor(statusCode: number = 500, message: string = 'Internal server error', errorCode?: string) {
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
 * Dynamically creates an error subclass using ErrorDefinitions
 */
export function BaseErrorClass(errorKey: ErrorKey) {
    const { httpCode, message: defaultMessage, errorCode } = ErrorDefinitions[errorKey];
    return class extends BaseError {
        constructor(messageOverride?: string) {
            super(httpCode, messageOverride || defaultMessage, errorCode);
        }
    };
}
