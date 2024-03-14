import request from 'supertest';
import fs from 'fs';
import app from '../app';
import axiosRequest from '../utils/axios-request';

const basePath = '/phase2';

const goalMap = JSON.parse(fs.readFileSync('./.jest/goal.json', 'utf8'));
const invalidGoalMap = JSON.parse(fs.readFileSync('./.jest/invalid-goal.json', 'utf8'));

afterEach(() => {
    jest.clearAllMocks();
});

describe('POST /phase1', () => {
    describe('with the external API available', () => {
        test('should respond with HTTP status code 200', async () => {
            jest.spyOn(axiosRequest, 'post').mockResolvedValue({});
            jest.spyOn(axiosRequest, 'get').mockResolvedValue({ data: goalMap });
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with the external API unavailable', () => {
        test('should respond with HTTP status code 500', async () => {
            jest.spyOn(axiosRequest, 'post').mockRejectedValue({});
            jest.spyOn(axiosRequest, 'get').mockResolvedValue({ data: goalMap });
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error');
        });
    });
    describe('with an invalid goal map response', () => {
        test('should respond with HTTP status code 500', async () => {
            jest.spyOn(axiosRequest, 'post').mockResolvedValue({});
            jest.spyOn(axiosRequest, 'get').mockResolvedValue({ data: invalidGoalMap });
            const response = await request(app).post(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error: An internal configuration error occurred');
        });
    });
});

describe('DELETE /phase1', () => {
    describe('with the external API available', () => {
        test('should respond with HTTP status code 200', async () => {
            jest.spyOn(axiosRequest, 'delete').mockResolvedValue({});
            jest.spyOn(axiosRequest, 'get').mockResolvedValue({ data: goalMap });
            const response = await request(app).delete(basePath).send();
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with the external API unavailable', () => {
        test('should respond with HTTP status code 500', async () => {
            jest.spyOn(axiosRequest, 'delete').mockRejectedValue({});
            jest.spyOn(axiosRequest, 'get').mockResolvedValue({ data: goalMap });
            const response = await request(app).delete(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error');
        });
    });
    describe('with an invalid goal map response', () => {
        test('should respond with HTTP status code 500', async () => {
            jest.spyOn(axiosRequest, 'delete').mockResolvedValue({});
            jest.spyOn(axiosRequest, 'get').mockResolvedValue({ data: invalidGoalMap });
            const response = await request(app).delete(basePath).send();
            expect(response.statusCode).toBe(500);
            expect(response.body.code).toBe(500);
            expect(response.body.message).toBe('Internal Server Error: An internal configuration error occurred');
        });
    });
});
