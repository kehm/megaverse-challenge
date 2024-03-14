import { CreateObjectRequestBody } from '../types/types';
import AstralObject from './AstralObject';
import axiosRequest from '../utils/axios-request';

class Polyanet extends AstralObject {
    URL = `${process.env.API_URL}/polyanets`;

    async draw(): Promise<void> {
        const requestBody: CreateObjectRequestBody = {
            candidateId: this.CANDIDATE_ID,
            row: this.row,
            column: this.column,
        };
        await axiosRequest.post(this.URL, requestBody);
    }

    async remove(): Promise<void> {
        await super.removeAstralObject(this.URL);
    }
}

export default Polyanet;
