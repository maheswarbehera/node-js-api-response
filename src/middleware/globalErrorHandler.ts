import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import os from 'os';
import BaseError from '../error/BaseError'; 

/**
 * Global Express error-handling middleware to standardize API error responses.
 *
 * Handles and formats various types of errors:
 * - Custom `BaseError`
 * - MongoDB & Mongoose errors (duplicate keys, validation, cast)
 * - JWT token errors
 * - Node.js system errors
 * - JavaScript runtime errors
 * - HTTP client/network errors (Axios, fetch)
 *
 * Logs stack trace in development. Returns structured JSON response with `status`, `statusCode`, `message`,
 * and optionally `errorCode`, `details`, `name`, and `stack`.
 *
 * @param {any} err - The error object thrown in the middleware chain.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void}
 */
const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong. Please try again later.';
  const status = err.status ?? false;
  const stack = err.stack;
  const errorName = err.name || 'Error';
  const errorCode = err.errorCode || null;

  // In development mode, log the stack trace for debugging
  const isProduction = process.env.NODE_ENV === 'production';
  const log = `[${os.hostname()}] [${statusCode}] | ${req.method} ${req.originalUrl} - ${errorName} | ${message}`;
  console.error(isProduction ? log : `${log} | ${stack}`);

  /**
   * Formats and sends a standardized JSON error response.
   * 
   * @param {number} statusCode - HTTP status code to send.
   * @param {string} message - Message to describe the error.
   */
  const sendErrorResponse = (statusCode: number, message: string): void => {
    const responseBody: any = {
      status,
      statusCode,
      message, 
      timestamp : new Date().toISOString()
    };

    if (errorCode) responseBody.errorCode = errorCode;

    if (!isProduction) {
      responseBody.name = errorName;
      responseBody.stackTrace = stack;
    }

    res.status(statusCode).json(responseBody);
  };

  // Check if the error is an instance of BaseError
  if (err instanceof BaseError) return sendErrorResponse(statusCode, message);

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const fields = err.keyValue
      ? Object.entries(err.keyValue).map(([key, val]) => `${key}: ${val}`)
      : [];
    message = `Duplicate entry: ${fields.join(', ')} already exists.`;
    return sendErrorResponse(statusCode, message);
  }

  // Mongoose validation error
  if (errorName === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e: any) => e.message).join(', ');
    return sendErrorResponse(statusCode, message);
  }

  // Invalid ObjectId cast error (Mongoose)
  if (errorName === 'CastError') {
    return sendErrorResponse(400, `Invalid ${err.path}: ${err.value}`);
  }

  // JWT authentication errors
  if (errorName === 'TokenExpiredError') return sendErrorResponse(401, 'Access token has expired');
  if (errorName === 'JsonWebTokenError') return sendErrorResponse(401, 'Invalid access token');
  if (errorName === 'NotBeforeError') return sendErrorResponse(401, 'Access token not active yet');

  // Node.js system-level errors
  const systemErrors: Record<string, [number, string]> = {
    ENOENT: [404, 'File or resource not found.'],
    EACCES: [403, 'Permission denied.'],
    ECONNREFUSED: [503, 'Connection refused.'],
    ETIMEDOUT: [504, 'Request timed out.'],
    ECONNRESET: [502, 'Connection was reset.'],
  };
  if (err.code && systemErrors[err.code]) {
    const [code, msg] = systemErrors[err.code];
    return sendErrorResponse(code, `${msg} (${err.code})`);
  }

  // JavaScript built-in runtime errors
  const jsErrorTypes = [
    'SyntaxError',
    'ReferenceError',
    'TypeError',
    'RangeError',
    'URIError',
    'EvalError',
    'AggregateError',
  ];
  if (jsErrorTypes.includes(errorName)) {
    return sendErrorResponse(500, `Unexpected ${errorName}: ${message}`);
  }

  // Axios or fetch network-related error
  if (err.isAxiosError || /fetch|network/i.test(message)) {
    return sendErrorResponse(502, `External API/network request failed: ${message}`);
  }

  // Default Fallback: any other unhandled error
  return sendErrorResponse(statusCode, message);
};

export default globalErrorHandler;