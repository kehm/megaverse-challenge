import { createCross, removeCross } from '../services/phase1-service';
import { createLogo, removeLogo } from '../services/phase2-service';
import getLogger from './logger';
import createErrorResponse from './create-error-response';

const logger = getLogger('run-phase');

/**
 * A helper function to run either phase individually, i.e. not as part of the REST API.
 *
 * @param phase Name of the phase to run.
 */
const runPhase = async (
    phase: string,
): Promise<void> => {
    try {
        switch (phase) {
            case 'createCross':
                await createCross();
                break;
            case 'removeCross':
                await removeCross();
                break;
            case 'createLogo':
                await createLogo();
                break;
            case 'removeLogo':
                await removeLogo();
                break;
            default:
                throw new Error('The specified phase is not defined');
        }
    } catch (err: unknown) {
        logger.debug(err);
        const errorResponse = createErrorResponse(err);
        logger.debug(errorResponse);
        process.exitCode = 1;
    }
};

export default runPhase;
