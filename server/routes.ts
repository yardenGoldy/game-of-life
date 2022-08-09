import gameApi from "./components/game/gameApi";
import { Router } from "express";

class Routes {
    private _appRoutes: Router;
    constructor() {
        this._appRoutes = Router();

        this.initComponentsRoutes();

        this._appRoutes.get('/api', (req, res) => res.json({ application: 'App is good' }));
    }

    private initComponentsRoutes() {
        this._appRoutes.use("/game", gameApi);
    }

    get routes(): Router {
        return this._appRoutes;
    }
}

export default new Routes().routes;
