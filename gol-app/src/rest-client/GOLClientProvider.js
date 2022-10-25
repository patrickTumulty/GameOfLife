import GameOfLifeClient from "./GameOfLifeClient";


export default class GOLClientProvider {

    static {
        this._client = new GameOfLifeClient();
    }

    static getClient() {
        return this._client;
    }

}
