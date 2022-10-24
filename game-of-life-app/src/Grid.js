
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
                        GOLClientProvider.getClient().getNextGeneration(this.state.grid);
                    }}>Start</button>
                </div>
            </div>
        )
    }

    clearGrid() {
        this.setState({
            grid: this.initGrid()
        });
    }

    renderGridCells() {
        const gridCells = [];
        for (let row = 0; row < this.rows; row++) {
            gridCells.push([]);
            for (let col = 0; col < this.cols; col++) {
                const style = {
                    backgroundColor: this.state.grid[row][col] ?
                        getComputedStyle(this.r).getPropertyValue('--cell-color-activated') :
                        getComputedStyle(this.r).getPropertyValue('--cell-color-deactivated')
                }
                gridCells[row].push(this.constructGridCell(style, row, col));
            }
        }
        return gridCells;
    }

    constructGridCell(style, row, col) {
        return <div style={style}
                    className="grid-cell"
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
