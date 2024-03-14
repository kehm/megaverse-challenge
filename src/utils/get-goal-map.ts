import { GoalMapResponseBody } from '../types/types';
import axiosRequest from './axios-request';

const GOAL_MAP_URL = `${process.env.API_URL}/map/${process.env.CANDIDATE_ID}/goal`;

const getGoalMap = async (): Promise<GoalMapResponseBody> => {
    const response = await axiosRequest.get(GOAL_MAP_URL);
    return response.data as GoalMapResponseBody;
};

export default getGoalMap;
