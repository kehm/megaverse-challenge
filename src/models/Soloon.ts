import { CreateSaloonRequestBody, color as colorType } from '../types/types';
import AstralObject from './AstralObject';
import axiosRequest from '../utils/axios-request';

class Soloon extends AstralObject {
    URL = `${process.env.API_URL}/soloons`;

    color: colorType;

    constructor(row: number, column: number, color: colorType) {
        super(row, column);
        this.color = color;
    }

    async draw(): Promise<void> {
        const requestBody: CreateSaloonRequestBody = {
            candidateId: this.CANDIDATE_ID,
            row: this.row,
            column: this.column,
            color: this.color,
        };
        await axiosRequest.post(this.URL, requestBody);
    }

    async remove(): Promise<void> {
        await super.removeAstralObject(this.URL);
    }
}

export default Soloon;
