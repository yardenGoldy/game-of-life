import { IGame, state } from "app-shared-types";
import { GameStrategy } from "./models/gameStrategy";
import { IGameStrategy } from "./models/IGameStrategy";
export class GameService {
    constructor(private _gameStrategy: IGameStrategy = new GameStrategy()){

    }

    initGame(): IGame
    {
      return {
        board:this._gameStrategy.initBoard()
      }
    }

    getNextStep(board: Array<Array<state>>)
    {
      return this._gameStrategy.updateNextStep(board);
    }
    
} 