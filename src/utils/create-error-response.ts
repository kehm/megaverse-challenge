import { AxiosError, HttpStatusCode } from 'axios';
import { ErrorResponse } from '../types/types';
import InvalidAstralObjectError from '../errors/InvalidAstralObjectError';

const createErrorResponse = (
    err: unknown,
): ErrorResponse => {
    if (err instanceof AxiosError) {
        if (err.code === 'ECONNREFUSED') {
            return {
                code: HttpStatusCode.InternalServerError,
                message: 'Internal Server Error: The host refused the connection',
            };
        }
        if (err.response?.status === HttpStatusCode.NotFound) {
            return {
                code: HttpStatusCode.InternalServerError,
                message: 'Internal Server Error: An internal configuration error occurred',
            };
        }
        if (err.response?.status === HttpStatusCode.TooManyRequests) {
            return {
                code: HttpStatusCode.InternalServerError,
                message: 'Internal Server Error: An internal API received too many requests',
            };
        }
    }
    if (err instanceof InvalidAstralObjectError) {
        return {
            code: HttpStatusCode.InternalServerError,
            message: 'Internal Server Error: An internal configuration error occurred',
        };
    }
    return {
        code: HttpStatusCode.InternalServerError,
        message: 'Internal Server Error',
    };
};

export default createErrorResponse;
