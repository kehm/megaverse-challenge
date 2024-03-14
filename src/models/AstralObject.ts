import { CreateObjectRequestBody } from '../types/types';
import axiosRequest from '../utils/axios-request';

abstract class AstralObject {
    CANDIDATE_ID = process.env.CANDIDATE_ID as string;

    row: number;

    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    abstract draw(): Promise<void>;

    abstract remove(): Promise<void>;

    async removeAstralObject(url: string): Promise<void> {
        const requestBody: CreateObjectRequestBody = {
            candidateId: this.CANDIDATE_ID,
            row: this.row,
            column: this.column,
        };
        await axiosRequest.delete(url, { data: requestBody });
    }
}

export default AstralObject;
