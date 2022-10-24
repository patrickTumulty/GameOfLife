
import './css/Grid.css'
import './css/GlobalStyles.css'
import {Component} from "react";
import GameOfLifeClient from "./rest-client/GameOfLifeClient";
import GOLClientProvider from "./rest-client/GOLClientProvider";


export default class Grid extends Component {

    constructor(props) {
        super(props);

        this.cols = props.cols;
        this.rows = props.rows;
        this.r = document.querySelector(':root');

        this.state = {
            grid: this.initGrid()
        }

        const r = document.querySelector(':root');
        r.style.setProperty("--rows", this.rows);
        r.style.setProperty("--cols", this.cols);
    }

    initGrid() {
        const grid = [];
        for (let row = 0; row < this.rows; row++) {
            grid.push([]);
            for (let col = 0; col < this.cols; col++) {
                grid[row].push(false);
            }
        }
        return grid;
    }

    render() {
        return (
            <div>
                <div className="grid-container">
                    <div className='grid'>
                        {this.renderGridCells()}
                    </div>
                </div>
                <div>
                    <button className="gs-button" onClick={() => this.clearGrid()}>Clear</button>
                    <button className="gs-button" onClick={() => {
                        let newGrid = GOLClientProvider.getClient().getNextGeneration(this.state.grid);
                        this.setState({
                            grid: this.setActiveGridCells(newGrid.activeCells)
                        });
                    }}>Start</button>
                </div>
            </div>
        )
    }

    /**
     * Clears the current grid state and applies the given activated cells.
     *
     * @param activatedCells List of active cells coordinates. activatedCells is an N by 2 list where index 0 = row and
     *                       1 = column.
     * @returns {Array<Array<Boolean>>}
     */
    setActiveGridCells(activatedCells) {
        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid[i].length; j++) {
                this.state.grid[i][j] = false;
            }
        }
        for (let i = 0; i < activatedCells.length; i++) {
            this.state.grid[activatedCells[i][0]][activatedCells[i][1]] = true;
        }
        return this.state.grid;
    }

    clearGrid() {
        this.setState({
            grid: this.setActiveGridCells([])
        });
    }

    renderGridCells() {
        const gridCells = [];
        for (let row = 0; row < this.rows; row++) {
            gridCells.push([]);
            for (let col = 0; col < this.cols; col++) {

                gridCells[row].push(this.constructGridCell(row, col));
            }
        }
        return gridCells;
    }

    constructGridCell(row, col) {
        return <div className={`grid-cell ${this.state.grid[row][col] ? "grid-cell-activated" : "grid-cell-deactivated"}`}
                    onClick={() => this.toggleGridCell(row, col)}
                    onMouseEnter={(event) => {
                        if (event.buttons === 1 && !this.state.grid[row][col]) {
                            this.toggleGridCell(row, col);
                        }
                    }}
                    key={`${row}${col}`}></div>;
    }

    toggleGridCell(row, col) {
        this.state.grid[row][col] = !this.state.grid[row][col];
        this.setState({
            grid: this.state.grid,
        });
    }
}
