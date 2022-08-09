import routes from "./routes";
import app from "./app";
import { Application } from "express";
import * as fs from 'fs';
import * as util from 'util';
import {serverAPIPort} from "app-configuration";
const promisedWriteFile = util.promisify(fs.writeFile);
const listEndpoints = require('express-list-endpoints')
class Server {
    private _port = process.env.PORT || serverAPIPort;
    private _host = 'localhost';
    private _app: Application;

    constructor() {

        // Initial application
        this._app = app;

        // Initial application routes
        // As middleware
        this._app.use("/", routes);
        const allRoutes = listEndpoints(this._app);
        promisedWriteFile("Application_Routes.json", JSON.stringify(allRoutes));

        // Starting process
        this._app.listen(this._port);

        console.log(`App listening on: http://${this._host}:${this._port}/`);
    }
}

// Initial all backend
const server = new Server();
