import { Request, Response, NextFunction } from 'express';

/**
 * Wraps an asynchronous route handler function and ensures that any errors are passed to the next middleware.
 *
 * @param {Function} fn - The asynchronous route handler function to wrap. It receives the Express `Request`, `Response`, and `NextFunction` objects.
 * @returns {Function} A function that executes the handler and catches any rejected promises, forwarding errors to Express error handling middleware.
 * 
 * * @example
 * router.get('/example', asyncHandler(async (req, res) => {
 *   const data = await somethingAsync();
 *   res.json(data);
 * }));
 */

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): Function => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    }
}