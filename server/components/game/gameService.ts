import { IGame, state } from "app-shared-types";
import { GameStrategy } from "./models/gameStrategy";
import { IGameStrategy } from "./models/IGameStrategy";
export class GameService {
    constructor(private _gameStrategy: IGameStrategy = new GameStrategy()){

    }

    initGame(): IGame
    {
      return {
        board:this._gameStrategy.initBoard(),
        amountOfLife:0
      }
    }

    getNextStep(board: Array<Array<state>>): IGame
    {
      const newBoard = this._gameStrategy.updateNextStep(board);
      return {
        board: newBoard, 
        amountOfLife: this._gameStrategy.getAmountOfLife(newBoard)
      }
    }
    
} 