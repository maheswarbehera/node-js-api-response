/**
 * Represents an API error with a status code and message.
 * 
 * @extends Error
 */

class ApiError extends Error {

    /**
     * Creates an instance of the ApiError class.
     * 
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {string} [message="Internal server error"] - The error message.
     */

    constructor(
        statusCode,  
        message = "Internal server error",      
    )
    {
        super(message);
        this.statusCode = statusCode  
        this.status = false
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
        
    }
}

/**
 * Creates and passes an API error to the next middleware, or throws it if no next function is provided.
 * 
 * @param {number} statusCode - The HTTP status code for the error.
 * @param {string|any} message - The error message or data to be passed as a message.
 * @param {function} next - The next middleware function to pass the error to.
 * @throws {Error} If the `next` parameter is not a function, the error is thrown synchronously.
 */
const ApiErrorResponse = (statusCode, message , next) => {
    if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
        statusCode = 500; // Default to 500 if the status code is invalid
    }

    const error = new ApiError(statusCode, message);
    if (typeof next === 'function') {
        next(error); // Pass the error to the next middleware function
    } else {
        throw new Error('next() is not a function');
    } 
}

export { ApiError, ApiErrorResponse }
  