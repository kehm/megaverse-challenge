import assert from 'assert';

/**
 * Check that the specified environment variables have been defined.
 *
 * @param varNames An array of environment variable names.
 */
const assertEnv = (
    varNames: string[],
): void => {
    varNames.forEach((varName) => {
        assert(process.env[varName], `Environment variable "${varName}" is missing`);
    });
};

export default assertEnv;
