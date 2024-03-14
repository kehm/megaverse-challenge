export enum AstralObject {
    Empty = 'SPACE',
    Polyanet = 'POLYANET',
    UpCometh = 'UP_COMETH',
    DownCometh = 'DOWN_COMETH',
    RightCometh = 'RIGHT_COMETH',
    LeftCometh = 'LEFT_COMETH',
    BlueSoloon = 'BLUE_SOLOON',
    RedSoloon = 'RED_SOLOON',
    PurpleSoloon = 'PURPLE_SOLOON',
    WhiteSoloon = 'WHITE_SOLOON',
}

export type color = 'blue' | 'red' | 'purple' | 'white';

export type direction = 'up' | 'down' | 'right' | 'left';

export interface RequestBody {
    candidateId: string;
}

export interface CreateObjectRequestBody extends RequestBody {
    row: number;
    column: number;
}

export interface CreateSaloonRequestBody extends CreateObjectRequestBody {
    color: color;
}

export interface CreateComethRequestBody extends CreateObjectRequestBody {
    direction: direction;
}

export interface GoalMapResponseBody {
    goal: AstralObject[][];
}

export interface CrossProps {
    diagonalLength: number;
    lineAStartRow: number;
    lineBStartRow: number;
}

export interface ErrorResponse {
    code: number;
    message: string;
}
