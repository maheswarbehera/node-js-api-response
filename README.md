# node-js-api-response

This package provides custom API response and error-handling middleware for Express.js applications. It helps standardize error handling, API responses, and logging based on the environment.

## Features

- **Custom error handling** using the `ApiError` class
- **Standardized API response format** using the `ApiResponse` class
- **Error logging** based on the environment (development/production)
- **Error handling middleware** (`errorHandler`) for consistent error responses
- **Asynchronous route handling** with `asyncHandler` to catch unhandled promise rejections

---

## Installation

To install the package:

```bash
npm install node-js-api-response
```

---

## `asyncHandler` for Express.js

`asyncHandler` is a utility function that helps manage asynchronous route handlers in Express.js applications. It automatically catches any errors and forwards them to the next middleware function, simplifying error handling for async code.

### Features

- Automatically handles asynchronous errors in Express.js route handlers.
- Eliminates the need for `try-catch` blocks for each route.
- Catches unhandled promise rejections and forwards them to error middleware.

### Installation

```bash
npm install node-js-api-response
```

The `asyncHandler` function is predefined as follows:

```javascript
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
}
```

### Usage

`asyncHandler` wraps asynchronous route handlers in Express.js to ensure errors are forwarded to the error-handling middleware.

#### Basic Example

```javascript
import express from 'express';
import { asyncHandler } from 'node-js-api-response'; // Install via npm package

const app = express();

// A sample asynchronous route using asyncHandler
app.get('/async-route', asyncHandler(async (req, res) => {
    // Simulating async operation, e.g., fetching data from a database
    const data = await fetchDataFromDatabase(); // Placeholder for async code
    res.json(data);  // Send data as JSON response
}));

// Default route to test
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## API Response Helper for Express.js

The `ApiResponse` class and `ApiSuccessResponse` function help standardize successful API responses in your Express.js application. They ensure that all successful responses follow a consistent structure, making your API easier to maintain and more predictable for clients.

### Features

- Simplifies sending successful API responses with a consistent format.
- Includes `statusCode`, `message`, `data`, and `status` properties in the response.
- Easy to integrate into your Express.js route handlers.

### Installation

```bash
npm install node-js-api-response
```

### Usage

You can use `ApiResponse` and `ApiSuccessResponse` to send structured, consistent responses.

#### Example: Send a Successful Response

```javascript
import { ApiSuccessResponse } from 'node-js-api-response'; 

app.get('/success', (req, res) => {
  // Data to return in the response
  const data = {
    user: { name: 'John Doe', age: 30 },
    message: 'User data fetched successfully'
  };

  // Send a success response
  ApiSuccessResponse(res, 200, data, 'Request was successful');
});
```

---

## API Error Response Helper for Express.js

The `ApiError` class and `ApiErrorResponse` function help handle errors in your Express.js application in a consistent and structured manner. These utilities are designed to make it easier to manage error responses, especially when dealing with asynchronous code and middleware.

### Features

- `ApiError` Class: A custom error class that extends the built-in `Error` class to represent API errors with an HTTP status code and message.
- `ApiErrorResponse` Function: A utility function that creates an `ApiError` instance and passes it to the next middleware or throws an error if no next function is provided.

### Installation

```bash
npm install node-js-api-response
```

### Usage

You can use `ApiError` and `ApiErrorResponse` in your Express.js application to handle errors consistently.

#### Example: Handle Errors in Express.js Routes

```javascript
import { ApiErrorResponse } from 'node-js-api-response'; 

// A sample route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an API error response with a 400 status code
  ApiErrorResponse(400, 'Bad request: Invalid parameters', next);
});

// Example route to simulate an internal server error
app.get('/server-error', (req, res, next) => {
  // Trigger a 500 error for internal server problems
  ApiErrorResponse(500, 'Internal server error occurred', next);
});
```

---

## `errorHandler` Middleware

The `errorHandler` middleware for Express.js is a custom middleware designed to handle errors in a centralized way. It formats the error response and logs the details based on the environment (development or production). This ensures that errors are properly handled and logged, while providing clients with a consistent error response format.

### Features

- Customizable error format: Sends a standardized error response with `statusCode`, `message`, `status`, and `name`.
- **Development-Mode Logging**: Logs detailed error stack traces in development mode to help with debugging.
- **Production Logging**: In production, logs basic error information without exposing sensitive stack traces.
- Seamless integration with `ApiError` or any other error class.
- Environment-based behavior: Modifies logging behavior based on the `NODE_ENV` environment variable.

### Installation

Ensure that the required dependencies (`ApiError`, `logger`) are imported correctly into your application.

### Usage

You can use the `errorHandler` middleware in your Express.js application to handle errors uniformly across your routes.

#### Example:

```javascript
import { ApiError } from 'node-js-api-response'; // Import the custom error class

// Sample route that throws a custom ApiError
app.get('/error', (req, res, next) => {
  // Simulate an API error with a 400 status code
  next(new ApiError(400, 'Bad Request: Invalid parameters'));
});

// Use the error handler middleware
app.use(errorHandler);
```

---

## License

This package is licensed under the MIT License.

---

This documentation provides a quick overview of the features, installation instructions, and usage examples for each utility. Let me know if you need further clarifications!