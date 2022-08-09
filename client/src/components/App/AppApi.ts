import { GameAPIRootPath } from 'app-configuration';
import { IGame } from 'app-shared-types';
import axios from 'axios';

export type ApiClient = {
    getGame: () => Promise<IGame>;
    getNextStep: (game: IGame) => Promise<IGame>;
}

export const createApiClient = (): ApiClient => {
    return {
        getGame: async () => {
            return axios.get(GameAPIRootPath).then((res) => res.data);
        },
        getNextStep: async (game: IGame) => {
            return axios.post(GameAPIRootPath + "getNextStep", game).then((res) => res.data);
        }        
    }
}
