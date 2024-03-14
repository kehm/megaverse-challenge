import { Request, Response } from 'express';
import getLogger from '../utils/logger';
import { createCross, removeCross } from '../services/phase1-service';
import createErrorResponse from '../utils/create-error-response';

const logger = getLogger('phase1-controller');

export const createPolyanetCross = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        logger.debug('Creating polyanets cross...');
        await createCross();
        logger.debug('Successfully created polyanet cross');
        res.sendStatus(200);
    } catch (err: unknown) {
        logger.debug(err);
        const errorResponse = createErrorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
};

export const removePolyanetCross = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        logger.debug('Removing polyanets cross...');
        await removeCross();
        logger.debug('Successfully removed polyanet cross');
        res.sendStatus(200);
    } catch (err: unknown) {
        logger.debug(err);
        const errorResponse = createErrorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
};
