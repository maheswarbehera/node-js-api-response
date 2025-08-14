import { HttpStatusCodes, HttpStatusMessages } from "./httpCode";

export interface ErrorDetail {
  httpCode: number;
  message: string;
  errorCode: string;
}

const ErrorDefinitions: Record<string, ErrorDetail>  = {

    // Client-Side Errors

    BAD_REQUEST: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Bad request',
        errorCode: 'BAD_REQUEST',
    },
    UNAUTHORIZED: {
        httpCode: HttpStatusCodes.UNAUTHORIZED,
        message: 'Unauthorized access',
        errorCode: 'UNAUTHORIZED',
    },
    FORBIDDEN: {
        httpCode: HttpStatusCodes.FORBIDDEN,
        message: 'Forbidden',
        errorCode: 'FORBIDDEN',
    },
    NOT_FOUND: {
        httpCode: HttpStatusCodes.NOT_FOUND,
        message: HttpStatusMessages[HttpStatusCodes.NOT_FOUND],
        errorCode: 'NOT_FOUND',
    },
    METHOD_NOT_ALLOWED: {
        httpCode: HttpStatusCodes.METHOD_NOT_ALLOWED,
        message: 'Method not allowed',
        errorCode: 'METHOD_NOT_ALLOWED',
    },
    NOT_ACCEPTABLE: {
        httpCode: HttpStatusCodes.NOT_ACCEPTABLE,
        message: 'Not acceptable',
        errorCode: 'NOT_ACCEPTABLE',
    },
    CONFLICT: {
        httpCode: HttpStatusCodes.CONFLICT,
        message: 'Conflict error',
        errorCode: 'CONFLICT',
    },
    GONE: {
        httpCode: HttpStatusCodes.GONE,
        message: 'Resource gone',
        errorCode: 'GONE',
    },
    PRECONDITION_FAILED: {
        httpCode: HttpStatusCodes.PRECONDITION_FAILED,
        message: 'Precondition failed',
        errorCode: 'PRECONDITION_FAILED',
    },
    UNPROCESSABLE_ENTITY: {
        httpCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable entity',
        errorCode: 'UNPROCESSABLE_ENTITY',
    },
    TOO_MANY_REQUESTS: {
        httpCode: HttpStatusCodes.TOO_MANY_REQUESTS,
        message: 'Too many requests',
        errorCode: 'TOO_MANY_REQUESTS',
    },


    // 🛠 Server-Side Errors

    INTERNAL_SERVER_ERROR: {
        httpCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errorCode: 'INTERNAL_SERVER_ERROR',
    },
    NOT_IMPLEMENTED: {
        httpCode: HttpStatusCodes.NOT_IMPLEMENTED,
        message: 'Not implemented',
        errorCode: 'NOT_IMPLEMENTED',
    },
    BAD_GATEWAY: {
        httpCode: HttpStatusCodes.BAD_GATEWAY,
        message: 'Bad gateway',
        errorCode: 'BAD_GATEWAY',
    },
    SERVICE_UNAVAILABLE: {
        httpCode: HttpStatusCodes.SERVICE_UNAVAILABLE,
        message: 'Service unavailable',
        errorCode: 'SERVICE_UNAVAILABLE',
    },
    GATEWAY_TIMEOUT: {
        httpCode: HttpStatusCodes.GATEWAY_TIMEOUT,
        message: 'Gateway timeout',
        errorCode: 'GATEWAY_TIMEOUT',
    },
    HTTP_VERSION_NOT_SUPPORTED: {
        httpCode: HttpStatusCodes.HTTP_VERSION_NOT_SUPPORTED,
        message: 'HTTP version not supported',
        errorCode: 'HTTP_VERSION_NOT_SUPPORTED',
    },


    // 🔐 Authentication & Authorization Errors

    AUTHENTICATION: {
        httpCode: HttpStatusCodes.UNAUTHORIZED,
        message: 'Authentication failed',
        errorCode: 'AUTHENTICATION',
    },
    AUTHORIZATION: {
        httpCode: HttpStatusCodes.FORBIDDEN,
        message: 'Authorization denied',
        errorCode: 'AUTHORIZATION',
    },
    TOKEN_EXPIRED: {
        httpCode: HttpStatusCodes.UNAUTHORIZED,
        message: 'Token expired',
        errorCode: 'TOKEN_EXPIRED',
    },
    TOKEN_INVALID: {
        httpCode: HttpStatusCodes.UNAUTHORIZED,
        message: 'Token invalid',
        errorCode: 'TOKEN_INVALID',
    },
    SESSION_TIMEOUT: {
        httpCode: HttpStatusCodes.SESSION_TIMEOUT,
        message: 'Session timeout',
        errorCode: 'SESSION_TIMEOUT',
    },


    // 🧪 Validation Errors

    VALIDATION_ERROR: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Validation failed',
        errorCode: 'VALIDATION_ERROR',
    },
    FIELD_REQUIRED: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Required field missing',
        errorCode: 'FIELD_REQUIRED',
    },
    FIELD_LENGTH: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Invalid field length',
        errorCode: 'FIELD_LENGTH',
    },
    FIELD_FORMAT: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Invalid field format',
        errorCode: 'FIELD_FORMAT',
    },


    // 🗃 Database Errors

    DATABASE_CONNECTION: {
        httpCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Database connection failed',
        errorCode: 'DATABASE_CONNECTION',
    },
    RECORD_NOT_FOUND: {
        httpCode: HttpStatusCodes.NOT_FOUND,
        message: 'Database record not found',
        errorCode: 'RECORD_NOT_FOUND',
    },
    DUPLICATE_KEY: {
        httpCode: HttpStatusCodes.CONFLICT,
        message: 'Duplicate key error',
        errorCode: 'DUPLICATE_KEY',
    },
    QUERY_TIMEOUT: {
        httpCode: HttpStatusCodes.GATEWAY_TIMEOUT,
        message: 'Database query timeout',
        errorCode: 'QUERY_TIMEOUT',
    },
    DATABASE_VALIDATION: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Database validation failed',
        errorCode: 'DATABASE_VALIDATION',
    },


    // 📁 File Errors

    FILE_UPLOAD: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'File upload failed',
        errorCode: 'FILE_UPLOAD',
    },
    FILE_NOT_FOUND: {
        httpCode: HttpStatusCodes.NOT_FOUND,
        message: 'File not found',
        errorCode: 'FILE_NOT_FOUND',
    },
    FILE_PERMISSION: {
        httpCode: HttpStatusCodes.FORBIDDEN,
        message: 'File permission denied',
        errorCode: 'FILE_PERMISSION',
    },
    FILE_TOO_LARGE: {
        httpCode: HttpStatusCodes.PAYLOAD_TOO_LARGE,
        message: 'File too large',
        errorCode: 'FILE_TOO_LARGE',
    },


    // 🌐 External Service Errors

    EXTERNAL_SERVICE: {
        httpCode: HttpStatusCodes.BAD_GATEWAY,
        message: 'External service error',
        errorCode: 'EXTERNAL_SERVICE',
    },
    SERVICE_TIMEOUT: {
        httpCode: HttpStatusCodes.GATEWAY_TIMEOUT,
        message: 'Service timeout',
        errorCode: 'SERVICE_TIMEOUT',
    },


    // ⏱ Rate Limiting Errors

    RATE_LIMIT_EXCEEDED: {
        httpCode: HttpStatusCodes.TOO_MANY_REQUESTS,
        message: 'Rate limit exceeded',
        errorCode: 'RATE_LIMIT_EXCEEDED',
    },


    // ⚙ Application-Specific Errors

    FEATURE_NOT_ENABLED: {
        httpCode: HttpStatusCodes.FORBIDDEN,
        message: 'Feature not enabled',
        errorCode: 'FEATURE_NOT_ENABLED',
    },
    INVALID_STATE: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Invalid application state',
        errorCode: 'INVALID_STATE',
    },
    OPERATION_FAILED: {
        httpCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Operation failed',
        errorCode: 'OPERATION_FAILED',
    },
    INVALID_INPUT: {
        httpCode: HttpStatusCodes.BAD_REQUEST,
        message: 'Invalid input',
        errorCode: 'INVALID_INPUT',
    },


    // ❓ Unknown Error

    UNKNOWN: {
        httpCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'An unknown error occurred',
        errorCode: 'UNKNOWN',
    },

}as const;

export type ErrorKey = keyof typeof ErrorDefinitions;

export default ErrorDefinitions;