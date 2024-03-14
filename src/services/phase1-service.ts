import Polyanet from '../models/Polyanet';
import { CrossProps } from '../types/types';

/**
 * Creates two diagonal lines forming a polyanet cross. Lines are drawn from left to right.
 */
export const createCross = async (): Promise<void> => {
    const props: CrossProps = {
        // the length of each line in the cross
        diagonalLength: parseInt(process.env.DIAGONAL_LENGTH as string, 10),
        // the row on which to start line A (drawn from top to bottom of the grid)
        lineAStartRow: parseInt(process.env.LINE_A_START_ROW as string, 10),
        // the row on which to start line B (drawn from bottom to top of the grid)
        lineBStartRow: parseInt(process.env.LINE_B_START_ROW as string, 10),
    };
    const promises: Promise<void>[] = [];

    // creating the first diagonal line
    for (let i = 0; i < props.diagonalLength; i += 1) {
        const index = props.lineAStartRow + i;
        const polyanet = new Polyanet(index, index);
        promises.push(polyanet.draw());
    }

    // creating the second diagonal line
    for (let i = 0; i < props.diagonalLength; i += 1) {
        const row = props.lineBStartRow - i;
        const column = (props.lineBStartRow + 1 + i) - props.diagonalLength;
        const polyanet = new Polyanet(row, column);
        promises.push(polyanet.draw());
    }

    await Promise.all(promises);
};

/**
 * Removes the two diagonal lines forming the polyanet cross (if exists).
 */
export const removeCross = async (): Promise<void> => {
    const props: CrossProps = {
        diagonalLength: parseInt(process.env.DIAGONAL_LENGTH as string, 10),
        lineAStartRow: parseInt(process.env.LINE_A_START_ROW as string, 10),
        lineBStartRow: parseInt(process.env.LINE_B_START_ROW as string, 10),
    };
    const promises: Promise<void>[] = [];

    // removing the first diagonal line
    for (let i = 0; i < props.diagonalLength; i += 1) {
        const index = props.lineAStartRow + i;
        const polyanet = new Polyanet(index, index);
        promises.push(polyanet.remove());
    }

    // removing the second diagonal line
    for (let i = 0; i < props.diagonalLength; i += 1) {
        const row = props.lineBStartRow - i;
        const column = (props.lineBStartRow + 1 + i) - props.diagonalLength;
        const polyanet = new Polyanet(row, column);
        promises.push(polyanet.remove());
    }

    await Promise.all(promises);
};
