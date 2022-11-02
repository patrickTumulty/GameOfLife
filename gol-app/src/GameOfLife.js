
import './css/GameOfLife.css'
import './css/GlobalStyles.css'
import {Component} from "react";
import GOLClientProvider from "./rest-client/GOLClientProvider";

export default class GameOfLife extends Component {

    constructor(props) {
        super(props);

        this.frameTimer = null;

        this.cols = props.cols;
        this.rows = props.rows;
        this.r = document.querySelector(':root');
        this.gridLinesShowing = false;

        this.state = {
            running: false,
            gridLines: this.gridLinesShowing,
            grid: this.initGrid()
        }

        const r = document.querySelector(':root');
        r.style.setProperty("--rows", this.rows);
        r.style.setProperty("--cols", this.cols);
    }

    /**
     * Init bool grid
     *
     * @returns {[[boolean]]}
     */
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
                    <button disabled={this.state.running}
                            className="gs-button"
                            onClick={() => this.clearGrid()}>Clear</button>
                    <button disabled={this.state.running}
                            className="gs-button"
                            onClick={() => this.runGameOfLife()}>Start</button>
                    <button disabled={!this.state.running}
                            className="gs-button"
                            onClick={() => {this.stopGameOfLife()}}>Stop</button>
                    <button disabled={this.state.running}
                            className="gs-button"
                            onClick={() => this.getNextGrid()}>Next</button>
                    <button className="gs-button"
                            onClick={() => this.showGridLines()}>Show Grid</button>
                </div>
            </div>
        )
    }

    /**
     * Toggle show grid lines
     */
    showGridLines() {
        this.gridLinesShowing = !this.gridLinesShowing;
        this.setState({
            gridLines: this.gridLinesShowing,
        });
    }

    /**
     * Run game of life
     */
    runGameOfLife() {
        this.setRunning(true);
        this.frameTimer = setInterval(() => {
            let newGrid = GOLClientProvider.getClient().getNextGeneration(this.state.grid);
            if (newGrid.activeCells.length === 0) {
                this.stopGameOfLife();
            }
            this.setGrid(this.setActiveGridCells(newGrid.activeCells));
        }, 100);
    }

    /**
     * Stop game of life
     */
    stopGameOfLife() {
        this.setRunning(false);

        if (this.frameTimer != null) {
            clearInterval(this.frameTimer);
            this.frameTimer = null;
        }
    }

    /**
     * Set the game of life running sttatet
     *
     * @param running running state
     */
    setRunning(running) {
        this.state.running = running;
        this.setState({
            running: this.state.running
        });
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

    /**
     * Clear the grid
     */
    clearGrid() {
        this.setGrid(this.setActiveGridCells([]));
    }

    /**
     * Render grid cells
     *
     * @returns {[[JSX.Element]]}
     */
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

    /**
     * Construct a grid cell
     *
     * @param row row coordinate
     * @param col col coordinate
     * @returns {JSX.Element}
     */
    constructGridCell(row, col) {
        let activatedStyle = this.state.grid[row][col] ? "grid-cell-activated" : "grid-cell-deactivated";
        let gridLines = this.gridLinesShowing ? "grid-cell-grid-lines" : "";
        return <div className={`grid-cell ${activatedStyle} ${gridLines}`}
                    onClick={() => this.toggleGridCell(row, col)}
                    onMouseEnter={(event) => {
                        if (event.buttons === 1 && !this.state.grid[row][col]) {
                            this.toggleGridCell(row, col);
                        }
                    }}
                    key={`${row}${col}`}></div>;
    }

    /**
     * Toggle the state of a single grid cell
     *
     * @param row row coordinate
     * @param col col coordinate
     */
    toggleGridCell(row, col) {
        this.state.grid[row][col] = !this.state.grid[row][col];
        this.setGrid(this.state.grid);
    }

    /**
     * Get the next grid state
     */
    getNextGrid() {
        let newGrid = GOLClientProvider.getClient().getNextGeneration(this.state.grid);
        this.setGrid(this.setActiveGridCells(newGrid.activeCells));
    }

    /**
     * Set the grid state
     *
     * @param grid new grid
     */
    setGrid(grid) {
        this.setState({
            grid: grid
        });
    }
}
