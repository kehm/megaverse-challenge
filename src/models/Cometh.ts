import { CreateComethRequestBody, direction as directionType } from '../types/types';
import AstralObject from './AstralObject';
import axiosRequest from '../utils/axios-request';

class Cometh extends AstralObject {
    URL = `${process.env.API_URL}/comeths`;

    direction: directionType;

    constructor(row: number, column: number, direction: directionType) {
        super(row, column);
        this.direction = direction;
    }

    async draw(): Promise<void> {
        const requestBody: CreateComethRequestBody = {
            candidateId: this.CANDIDATE_ID,
            row: this.row,
            column: this.column,
            direction: this.direction,
        };
        await axiosRequest.post(this.URL, requestBody);
    }

    async remove(): Promise<void> {
        await super.removeAstralObject(this.URL);
    }
}

export default Cometh;
