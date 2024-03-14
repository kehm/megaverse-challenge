import request from 'supertest';
import { AxiosError } from 'axios';
import app from '../app';
import axiosRequest from '../utils/axios-request';

const basePath = '/phase1';

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /phase1', () => {
    describe('with the external API available', () => {
        test('should respond with HTTP status code 200', async () => {
            jest.spyOn(axiosRequest, 'post').mockResolvedValue({});
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with the external API unavailable', () => {
        test('should respond with HTTP status code 500', async () => {
            jest.spyOn(axiosRequest, 'post').mockRejectedValue({});
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error');
        });
    });
    describe('with the external API that does not exist', () => {
        test('should respond with HTTP status code 500', async () => {
            const axiosError = new AxiosError(
                'Not Found',
                'NOT_FOUND',
                // @ts-expect-error
                { headers: {} },
                {},
                { status: 404 },
            );
            jest.spyOn(axiosRequest, 'post').mockRejectedValue(axiosError);
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error: An internal configuration error occurred');
        });
    });
    describe('with the external API refusing connection', () => {
        test('should respond with HTTP status code 500', async () => {
            const axiosError = new AxiosError('ECONNREFUSED', 'ECONNREFUSED');
            jest.spyOn(axiosRequest, 'post').mockRejectedValue(axiosError);
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error: The host refused the connection');
        });
    });
    describe('with the external API unavailable due to too many requests', () => {
        test('should respond with HTTP status code 500', async () => {
            const axiosError = new AxiosError(
                'Too Many Requests',
                'TOO_MANY_REQUESTS',
                // @ts-expect-error
                { headers: {} },
                {},
                { status: 429 },
            );
            jest.spyOn(axiosRequest, 'post').mockRejectedValue(axiosError);
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error: An internal API received too many requests');
        });
    });
});

describe('DELETE /phase1', () => {
    describe('with the external API available', () => {
        test('should respond with HTTP status code 200', async () => {
            jest.spyOn(axiosRequest, 'delete').mockResolvedValue({});
            const response = await request(app).delete(basePath).send();
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with the external API unavailable', () => {
        test('should respond with HTTP status code 500', async () => {
            jest.spyOn(axiosRequest, 'delete').mockRejectedValue({});
            const response = await request(app).delete(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error');
        });
    });
});
