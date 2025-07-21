import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import os from 'os';
import { ApiError } from './ApiError';

/**
 * Global Express error-handling middleware to standardize API error responses.
 *
 * Handles and formats various types of errors:
 * - Custom `ApiError`
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
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong. Please try again later.';
  const status = err.status ?? false;
  const stack = err.stack;
  const errName = err.name || 'Error';
  const errCode = err.errorCode || null; 

  // In development mode, log the stack trace for debugging
  const isProduction = process.env.NODE_ENV === 'production';
  const log = `[${os.hostname()}] [${statusCode}] | ${req.method} ${req.originalUrl} - ${errName} | ${message}`;
  console.error(isProduction ? log : `${log} | ${stack}`);

  /**
   * Formats and sends a standardized JSON error response.
   * 
   * @param {number} statusCode - HTTP status code to send.
   * @param {string} message - Message to describe the error.
   */
  const errorResponse = (statusCode: number, message: string): void => {
    const response: any = {
      status,
      statusCode,
      message,
    };

    if (errCode) response.errorCode = errCode; 

    if (!isProduction) {
      response.name = errName;
      response.stack = stack;
    }

    res.status(statusCode).json(response);
  };

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) return errorResponse(statusCode, message);

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const fields = err.keyValue
      ? Object.entries(err.keyValue).map(([key, val]) => `${key}: ${val}`)
      : [];
    message = `Duplicate entry: ${fields.join(', ')} already exists.`;
    return errorResponse(statusCode, message);
  }

  // Mongoose validation error
  if (errName === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e: any) => e.message).join(', ');
    return errorResponse(statusCode, message);
  }

  // Invalid ObjectId cast error (Mongoose)
  if (errName === 'CastError') {
    return errorResponse(400, `Invalid ${err.path}: ${err.value}`);
  }

  // JWT authentication errors
  if (errName === 'TokenExpiredError') return errorResponse(401, 'Access token has expired');
  if (errName === 'JsonWebTokenError') return errorResponse(401, 'Invalid access token');
  if (errName === 'NotBeforeError') return errorResponse(401, 'Access token not active yet');

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
    return errorResponse(code, `${msg} (${err.code})`);
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
  if (jsErrorTypes.includes(errName)) {
    return errorResponse(500, `Unexpected ${errName}: ${message}`);
  }

  // Axios or fetch network-related error
  if (err.isAxiosError || /fetch|network/i.test(message)) {
    return errorResponse(502, `External API/network request failed: ${message}`);
  }

  // Default Fallback: any other unhandled error
  return errorResponse(statusCode, message);
};
