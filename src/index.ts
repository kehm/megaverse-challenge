import 'dotenv/config';
import getLogger from './utils/logger';
import assertEnv from './utils/assert-env';
import app from './app';
import runPhase from './utils/run-phase';

// Application entrypoint

const logger = getLogger('index');

assertEnv([
    'PORT',
    'CANDIDATE_ID',
    'API_URL',
    'API_REQUEST_DELAY_MS',
    'API_RETRIES',
    'API_BACKOFF_MS',
    'DIAGONAL_LENGTH',
    'LINE_A_START_ROW',
    'LINE_B_START_ROW',
]);

(async () => {
    if (process.env.PHASE) {
        await runPhase(process.env.PHASE as string);
    } else {
        app.listen(process.env.PORT, () => logger.info(`Server started on port ${process.env.PORT}`));
    }
})();
