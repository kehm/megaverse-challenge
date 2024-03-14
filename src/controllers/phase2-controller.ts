import { Request, Response } from 'express';
import getLogger from '../utils/logger';
import { createLogo, removeLogo } from '../services/phase2-service';
import createErrorResponse from '../utils/create-error-response';

const logger = getLogger('phase2-controller');

export const createAstralObjectsLogo = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        logger.debug('Creating astral objects logo...');
        await createLogo();
        logger.debug('Successfully created astral objects logo');
        res.sendStatus(200);
    } catch (err: unknown) {
        logger.debug(err);
        const errorResponse = createErrorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
};

export const removeAstralObjectsLogo = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        logger.debug('Removing astral objects logo...');
        await removeLogo();
        logger.debug('Successfully removed astral objects logo');
        res.sendStatus(200);
    } catch (err: unknown) {
        logger.debug(err);
        const errorResponse = createErrorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
};
