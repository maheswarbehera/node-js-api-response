import { Response } from 'express';

interface SuccessResponse<T = any> {
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
export class ApiResponse<T = any> {
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
     * Creates an instance of ApiResponse.
     *
     * @param statusCode - The HTTP status code.
     * @param data - The data payload.
     * @param message - The response message. Defaults to 'Success'.
     */
    constructor(statusCode: number, data: T, message: string = 'Success') {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.status = statusCode < 400;
    }

    /**
     * Converts the ApiResponse instance to a JSON object conforming to SuccessResponse<T>.
     *
     * @returns The JSON representation of the response.
     */
    toJSON(): SuccessResponse<T> {
        const response: SuccessResponse<T> = {
            statusCode: this.statusCode,
            status: this.status,
            message: this.message,
        };
        if (this.data !== undefined && this.data !== null) {
            response.data = this.data;
        }
        return response;
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
    data: T,
    message: string = 'Success'
): void => {
    const apiResponse = new ApiResponse<T>(statusCode, data, message);
    res.status(statusCode).json(apiResponse.toJSON());
};
