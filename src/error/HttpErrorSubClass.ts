// ⚠️ AUTO-GENERATED FILE — DO NOT MODIFY MANUALLY
import { BaseErrorClass } from '../error/BaseError';
import ErrorDefinitions from '../utils/constants/error.constants';

/**
 * Custom error classes generated from ErrorDefinitions.
 * Each class extends a BaseError with corresponding metadata.
 */

export class BadRequestError extends BaseErrorClass(ErrorDefinitions.BAD_REQUEST.errorCode) {}

export class UnauthorizedError extends BaseErrorClass(ErrorDefinitions.UNAUTHORIZED.errorCode) {}

export class ForbiddenError extends BaseErrorClass(ErrorDefinitions.FORBIDDEN.errorCode) {}

export class NotFoundError extends BaseErrorClass(ErrorDefinitions.NOT_FOUND.errorCode) {}

export class MethodNotAllowedError extends BaseErrorClass(ErrorDefinitions.METHOD_NOT_ALLOWED.errorCode) {}

export class NotAcceptableError extends BaseErrorClass(ErrorDefinitions.NOT_ACCEPTABLE.errorCode) {}

export class ConflictError extends BaseErrorClass(ErrorDefinitions.CONFLICT.errorCode) {}

export class GoneError extends BaseErrorClass(ErrorDefinitions.GONE.errorCode) {}

export class PreconditionFailedError extends BaseErrorClass(ErrorDefinitions.PRECONDITION_FAILED.errorCode) {}

export class UnprocessableEntityError extends BaseErrorClass(ErrorDefinitions.UNPROCESSABLE_ENTITY.errorCode) {}

export class TooManyRequestsError extends BaseErrorClass(ErrorDefinitions.TOO_MANY_REQUESTS.errorCode) {}

export class InternalServerErrorError extends BaseErrorClass(ErrorDefinitions.INTERNAL_SERVER_ERROR.errorCode) {}

export class NotImplementedError extends BaseErrorClass(ErrorDefinitions.NOT_IMPLEMENTED.errorCode) {}

export class BadGatewayError extends BaseErrorClass(ErrorDefinitions.BAD_GATEWAY.errorCode) {}

export class ServiceUnavailableError extends BaseErrorClass(ErrorDefinitions.SERVICE_UNAVAILABLE.errorCode) {}

export class GatewayTimeoutError extends BaseErrorClass(ErrorDefinitions.GATEWAY_TIMEOUT.errorCode) {}

export class HttpVersionNotSupportedError extends BaseErrorClass(ErrorDefinitions.HTTP_VERSION_NOT_SUPPORTED.errorCode) {}

export class AuthenticationError extends BaseErrorClass(ErrorDefinitions.AUTHENTICATION.errorCode) {}

export class AuthorizationError extends BaseErrorClass(ErrorDefinitions.AUTHORIZATION.errorCode) {}

export class TokenExpiredError extends BaseErrorClass(ErrorDefinitions.TOKEN_EXPIRED.errorCode) {}

export class TokenInvalidError extends BaseErrorClass(ErrorDefinitions.TOKEN_INVALID.errorCode) {}

export class SessionTimeoutError extends BaseErrorClass(ErrorDefinitions.SESSION_TIMEOUT.errorCode) {}

export class ValidationErrorError extends BaseErrorClass(ErrorDefinitions.VALIDATION_ERROR.errorCode) {}

export class FieldRequiredError extends BaseErrorClass(ErrorDefinitions.FIELD_REQUIRED.errorCode) {}

export class FieldLengthError extends BaseErrorClass(ErrorDefinitions.FIELD_LENGTH.errorCode) {}

export class FieldFormatError extends BaseErrorClass(ErrorDefinitions.FIELD_FORMAT.errorCode) {}

export class DatabaseConnectionError extends BaseErrorClass(ErrorDefinitions.DATABASE_CONNECTION.errorCode) {}

export class RecordNotFoundError extends BaseErrorClass(ErrorDefinitions.RECORD_NOT_FOUND.errorCode) {}

export class DuplicateKeyError extends BaseErrorClass(ErrorDefinitions.DUPLICATE_KEY.errorCode) {}

export class QueryTimeoutError extends BaseErrorClass(ErrorDefinitions.QUERY_TIMEOUT.errorCode) {}

export class DatabaseValidationError extends BaseErrorClass(ErrorDefinitions.DATABASE_VALIDATION.errorCode) {}

export class FileUploadError extends BaseErrorClass(ErrorDefinitions.FILE_UPLOAD.errorCode) {}

export class FileNotFoundError extends BaseErrorClass(ErrorDefinitions.FILE_NOT_FOUND.errorCode) {}

export class FilePermissionError extends BaseErrorClass(ErrorDefinitions.FILE_PERMISSION.errorCode) {}

export class FileTooLargeError extends BaseErrorClass(ErrorDefinitions.FILE_TOO_LARGE.errorCode) {}

export class ExternalServiceError extends BaseErrorClass(ErrorDefinitions.EXTERNAL_SERVICE.errorCode) {}

export class ServiceTimeoutError extends BaseErrorClass(ErrorDefinitions.SERVICE_TIMEOUT.errorCode) {}

export class RateLimitExceededError extends BaseErrorClass(ErrorDefinitions.RATE_LIMIT_EXCEEDED.errorCode) {}

export class FeatureNotEnabledError extends BaseErrorClass(ErrorDefinitions.FEATURE_NOT_ENABLED.errorCode) {}

export class InvalidStateError extends BaseErrorClass(ErrorDefinitions.INVALID_STATE.errorCode) {}

export class OperationFailedError extends BaseErrorClass(ErrorDefinitions.OPERATION_FAILED.errorCode) {}

export class InvalidInputError extends BaseErrorClass(ErrorDefinitions.INVALID_INPUT.errorCode) {}

export class UnknownError extends BaseErrorClass(ErrorDefinitions.UNKNOWN.errorCode) {}
