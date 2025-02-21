import { ApiError, logger }  from './index.js'; 

/**
 * A custom error-handling middleware for Express.js applications.
 * It formats error responses and logs the details based on the environment.
 * 
 * @param {Error} err - The error object, which can be a custom `ApiError` or a generic error.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function (not used in this handler).
 * 
 * @returns {object} The JSON error response sent to the client.
 */

const errorHandler = (err, req, res, next) => {
  // Default error properties
  const statusCode = err.statusCode || 500; 
  const message =  err.message || 'Internal Server Error'; 
  const status = err.status || false; 
  const stack = err.stack || undefined; 
  const name = err.name || 'Error';

  // In development mode, log the stack trace for debugging
  if (process.env.NODE_ENV === 'development') {
    logger.error(stack);
  }else{
    logger.error(`[${Date.now}] [${statusCode}] ${req.method} ${req.originalUrl} - ${message}`); 
  }

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    return res.status(statusCode).json({
      status: status,
      statusCode: statusCode,
      message: message,
      name: name,
      ...(stack  && { stack }),
    });
  }

  // Respond to the client with an error message
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    name,
    ...(stack && { stack }), // Include stack trace in development
  });
};

export { errorHandler };
