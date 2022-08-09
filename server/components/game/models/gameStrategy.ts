import { state } from "app-shared-types";
import { IGameStrategy } from "./IGameStrategy";

export class GameStrategy implements IGameStrategy
{
    private readonly ROWS = 50;
    private readonly COLS = 50;

    constructor(){

    }

    initBoard = () : Array<Array<state>> => {
        return Array(this.ROWS).fill(undefined).map(()=>Array(this.COLS).fill(state.unpopulated))
    }
    
    getAmountOfLife (board: Array<Array<state>>) : number{
        let amountOfLife = 0;
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
              amountOfLife += board[row][col];
            }
        }
        return amountOfLife;
    }
    
    updateNextStep = (previousBoard: Array<Array<state>>) => {    
        const updatedBoard = this.initBoard();
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                updatedBoard[row][col] = this.updateCellValue(previousBoard, row, col);
            }            
        }

        return updatedBoard;
    }

    private updateCellValue = (board: Array<Array<state>>, row:number, col:number): state => {
        const totalNeighbours = this.countNeighbours(board, row, col);
        if (totalNeighbours > 3 || totalNeighbours < 2) {
            return state.unpopulated;
        }
        else if(board[row][col] === state.unpopulated && totalNeighbours === 3)
        {
            return state.populated;
        }
        else
        {
            return board[row][col];
        }
    }

    private countNeighbours = (board: Array<Array<state>>, row: number, col: number) => {
        let totalNeighbours = 0;
        totalNeighbours += this.countNeighbour(board, row - 1, col - 1);
        totalNeighbours += this.countNeighbour(board, row - 1, col);
        totalNeighbours += this.countNeighbour(board, row - 1, col + 1);
        totalNeighbours += this.countNeighbour(board, row, col - 1);
        totalNeighbours += this.countNeighbour(board, row, col + 1);
        totalNeighbours += this.countNeighbour(board, row + 1, col - 1);
        totalNeighbours += this.countNeighbour(board, row + 1, col);
        totalNeighbours += this.countNeighbour(board, row + 1, col + 1);
        return totalNeighbours;
    };

    private countNeighbour = (board: Array<Array<state>>, row: number, col: number) => {
        try {
            const value = board[row][col];
            return (value == state.populated || value == state.unpopulated) ? value : 0;
        }
        catch {
            return 0;
         }
    }
}