import { GameAPIRootPath } from 'app-configuration';
import { IGame } from 'app-shared-types';
import axios from 'axios';

export type ApiClient = {
    getGame: () => Promise<IGame>;
}

export const createApiClient = (): ApiClient => {
    return {
        getGame: () => {
            return axios.get(GameAPIRootPath).then((res) => res.data);
        }
    }
}
