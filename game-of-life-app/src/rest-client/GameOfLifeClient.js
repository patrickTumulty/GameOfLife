
import RESTClient from "./RESTClient";

export default class GameOfLifeClient
{
    constructor() {
        this.client = new RESTClient("http://127.0.0.1:8080");

    }

    #grid2Json(grid) {
        let json = {
            rows: grid.length,
            cols: grid[0].length,
            data: this.#getActiveCells(grid)
        };
        console.log(json);
        return json;
    }

    #getActiveCells(grid) {
        let activeCells = [];
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col]) {
                    activeCells.push([row, col]);
                }
            }
        }

        return activeCells;
    }

    getNextGeneration(grid) {
        let response = this.client.post("/get-next-generation", this.#grid2Json(grid));
        console.log(response.responseText);
    }



}
