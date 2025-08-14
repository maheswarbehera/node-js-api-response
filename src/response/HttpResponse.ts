import { Response } from 'express';

interface SuccessPayload<T = any> {
    statusCode: number;
    status: boolean;
    message: string;
    data?: T;
}

/**
 * Represents a standardized API response structure.
 *
 * @template T - The type of the response data.
 */
export default class HttpBaseResponse<T = any> {
    /**
     * The HTTP status code of the response.
     */
    public statusCode: number;

    /**
     * The message describing the response.
     */
    public message: string;

    /**
     * The data payload of the response.
     */
    public data: T;

    /**
     * Indicates whether the response is successful (statusCode < 400).
     */
    public status: boolean;

    /**
     * Creates an instance of HttpBaseResponse.
     *
     * @param statusCode - The HTTP status code.
     * @param message - The response message. Defaults to 'Success'.
     * @param data - The data payload.
     */
    constructor(statusCode: number, message: string = 'Success', data: T,) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.status = statusCode < 400;
    }

    /**
     * Converts the HttpBaseResponse instance to a JSON object conforming to SuccessPayload<T>.
     *
     * @returns The JSON representation of the response.
     */
    toJSON(): SuccessPayload<T> {
        const response: SuccessPayload<T> = {
            statusCode: this.statusCode,
            message: this.message,
            status: this.status,
        };
        if (this.data !== undefined && this.data !== null) {
            response.data = this.data;
        }
        return response;
    }
}

/**
 * Represents a successful API response.
 */
export class HttpSuccessResponse<T = any> extends HttpBaseResponse<T> {
    constructor(statusCode: number = 200, message: string = 'Success', data?: T) {
        super(statusCode, message, data!);
    }
}

/**
 * Sends a standardized success response using the Express response object.
 *
 * @template T - The type of the response data.
 * @param res - The Express Response object.
 * @param statusCode - The HTTP status code.
 * @param data - The data payload to include in the response.
 * @param message - An optional custom message (defaults to 'Success').
 */
export const SuccessResponse = <T>(
    res: Response,
    statusCode: number,
    message: string = 'Success',
    data?: T
): void => {
    const apiResponse = new HttpSuccessResponse<T>(statusCode, message, data);
    res.status(statusCode).json(apiResponse.toJSON());
};
