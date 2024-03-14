import axios, { HttpStatusCode } from 'axios';
import axiosRateLimit from 'axios-rate-limit';
import axiosRetry from 'axios-retry';

const axiosRequest = axiosRateLimit(
    axios.create(),
    {
        // one request per x ms
        perMilliseconds: parseInt(process.env.API_REQUEST_DELAY_MS as string, 10),
        maxRequests: 1,
    },
);

axiosRetry(axiosRequest, {
    retries: parseInt(process.env.API_RETRIES as string, 10),
    // exponential backoff
    retryDelay: (retries) => parseInt(process.env.API_BACKOFF_MS as string, 10) * retries,
    retryCondition: (err) => {
        const retryOn = [HttpStatusCode.InternalServerError, HttpStatusCode.TooManyRequests];
        if (err.response && retryOn.includes(err.response.status)) {
            return true;
        }
        return false;
    },
});

export default axiosRequest;
