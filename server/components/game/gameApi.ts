import { GameService } from './GameService';
import { Router } from "express";
import { IGame } from 'app-shared-types';
class GameApi  {
    private _gameRoutes: Router;
    private _gameService: GameService;

    constructor() {
        this._gameRoutes = Router();
        this._gameService = new GameService();
        this.InitRoutes();
    }

    private InitRoutes() {
        this._gameRoutes.get("/alive", (req, res): void => {
            res.send(true);
        });
        this._gameRoutes.get("/", (req, res) => {
            const game = this._gameService.initGame();
            res.send(game);
        });

        this._gameRoutes.post("getNextStep", (req, res) => {
            var game: IGame = req.body;
            if(!this.validateParams(game))
            {
                res.status(400).send("invalid params");
                return;
            }
            game.board = this._gameService.getNextStep(game.board);
            res.send(game);
        });
    }

    private validateParams(query: any):boolean{
        return true;
    }

    get gameRoutes(): Router {
        return this._gameRoutes;
    }
}

export default new GameApi().gameRoutes;
