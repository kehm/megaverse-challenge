import { AstralObject } from '../types/types';
import InvalidAstralObjectError from '../errors/InvalidAstralObjectError';
import Polyanet from '../models/Polyanet';
import Cometh from '../models/Cometh';
import Soloon from '../models/Soloon';
import getGoalMap from '../utils/get-goal-map';

/**
 * Creates an astral object by calling the astral objects API. Different endpoints
 * are called based on the astral object type.
 *
 * @param row The row in which to place the astral object.
 * @param column The column in which to place the astral object.
 * @param astralObject The type of astral object to be created.
 */
const createAstralObject = async (
    row: number,
    column: number,
    astralObject: AstralObject,
): Promise<void> => {
    switch (astralObject) {
        case AstralObject.Empty:
            break;
        case AstralObject.Polyanet:
            await new Polyanet(row, column).draw();
            break;
        case AstralObject.UpCometh:
            await new Cometh(row, column, 'up').draw();
            break;
        case AstralObject.DownCometh:
            await new Cometh(row, column, 'down').draw();
            break;
        case AstralObject.RightCometh:
            await new Cometh(row, column, 'right').draw();
            break;
        case AstralObject.LeftCometh:
            await new Cometh(row, column, 'left').draw();
            break;
        case AstralObject.BlueSoloon:
            await new Soloon(row, column, 'blue').draw();
            break;
        case AstralObject.RedSoloon:
            await new Soloon(row, column, 'red').draw();
            break;
        case AstralObject.PurpleSoloon:
            await new Soloon(row, column, 'purple').draw();
            break;
        case AstralObject.WhiteSoloon:
            await new Soloon(row, column, 'white').draw();
            break;
        default:
            throw new InvalidAstralObjectError('The astral object type is not recognized');
    }
};

/**
 * Removes the specified astral object (if exists) by calling the astral objects API. Different
 * endpoints are called based on the astral object type.
 *
 * @param row The row in which the astral object exists.
 * @param column The column in which the astral object exists.
 * @param astralObject The type of astral object to be removed.
 */
const removeAstralObject = async (
    row: number,
    column: number,
    astralObject: AstralObject,
): Promise<void> => {
    switch (astralObject) {
        case AstralObject.Empty:
            break;
        case AstralObject.Polyanet:
            await new Polyanet(row, column).remove();
            break;
        case AstralObject.UpCometh:
        case AstralObject.DownCometh:
        case AstralObject.RightCometh:
        case AstralObject.LeftCometh:
            await new Cometh(row, column, 'left').remove();
            break;
        case AstralObject.BlueSoloon:
        case AstralObject.RedSoloon:
        case AstralObject.PurpleSoloon:
        case AstralObject.WhiteSoloon:
            await new Soloon(row, column, 'white').remove();
            break;
        default:
            throw new InvalidAstralObjectError('The astral object type is not recognized');
    }
};

/**
 * Creates a logo consisting of astral objects by repeatedly calling
 * the astral objects API.
 */
export const createLogo = async (): Promise<void> => {
    const goalMap = await getGoalMap();
    const promises: Promise<void>[] = [];

    goalMap.goal.forEach((row, i) => {
        row.forEach((astralObject, j) => {
            // i is the row number, j is the column number
            promises.push(createAstralObject(i, j, astralObject));
        });
    });

    await Promise.all(promises);
};

/**
 * Removes the logo consisting of astral objects (if exists) by repeatedly
 * calling the astral objects API.
 */
export const removeLogo = async (): Promise<void> => {
    const goalMap = await getGoalMap();
    const promises: Promise<void>[] = [];

    goalMap.goal.forEach((row, i) => {
        row.forEach((astralObject, j) => {
            // i is the row number, j is the column number
            promises.push(removeAstralObject(i, j, astralObject));
        });
    });

    await Promise.all(promises);
};
