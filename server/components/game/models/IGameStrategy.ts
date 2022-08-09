import { state } from "app-shared-types";

export interface IGameStrategy{
    initBoard(): Array<Array<state>>;
    updateNextStep(previousBoard: Array<Array<state>>): Array<Array<state>>; 
    getAmountOfLife(board: Array<Array<state>>): number; 
}