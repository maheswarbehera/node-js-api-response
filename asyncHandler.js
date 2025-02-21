/**
 * A higher-order function to handle asynchronous Express route handlers.
 * It wraps the provided request handler, catches any unhandled promise rejections,
 * and forwards the error to the next middleware function.
 * 
 * This is useful for simplifying error handling in async route handlers.
 * 
 * @param {Function} requestHandler - The asynchronous Express route handler to be wrapped.
 * @returns {Function} A middleware function that handles async errors.
 * 
 * @example
 * app.get('/async-route', asyncHandler(async (req, res, next) => {
 *   const data = await someAsyncFunction();
 *   res.json(data);
 * }));
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};
  
export { asyncHandler };
  