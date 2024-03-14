class InvalidAstralObjectError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidAstralObjectError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidAstralObjectError);
        }
    }
}

export default InvalidAstralObjectError;
