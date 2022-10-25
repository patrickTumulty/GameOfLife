package com.pt.golservice;

import com.pt.golservice.RestModels.GridState;

import java.util.LinkedList;
import java.util.List;

public class GameOfLifeProcessor
{
    private static final int[][] gridIterator;
    private boolean[][] visited;
    private boolean[][] originalState;
    private boolean[][] newState;
    private int rows;
    private int cols;

    static {
        gridIterator = new int[][] {
                {-1, -1},
                {-1, 0},
                {-1, 1},
                {0, -1},
                {0, 1},
                {1, -1},
                {1, 0},
                {1, 1},
        };
    }

    /**
     * Given a grid state, determine the next grid state (generation)
     *
     * @param gridState current grid state
     * @return next grid state
     */
    public GridState getNextGeneration(GridState gridState)
    {
        initOriginalAndNewGrids(gridState);

        visited = new boolean[rows][cols];
        for (List<Integer> activatedCell : gridState.getActiveCells())
        {
            evaluateCell(activatedCell.get(0), activatedCell.get(1));
        }

        List<List<Integer>> activeCells = getNewActiveCells();
        gridState.setActiveCells(activeCells);
        return gridState;
    }

    /**
     * Get new active cells
     *
     * @return List of active cells coordinates (N x 2 list)
     */
    private List<List<Integer>> getNewActiveCells()
    {
        List<List<Integer>> activeCells = new LinkedList<>();
        for (int i = 0; i < newState.length; i++)
        {
            for (int j = 0; j < newState[i].length; j++)
            {
                if (newState[i][j])
                {
                    activeCells.add(List.of(i, j));
                }
            }
        }
        return activeCells;
    }

    /**
     * Init original and new grids
     *
     * @param gridState input grid state
     */
    private void initOriginalAndNewGrids(GridState gridState)
    {
        rows = gridState.getRows();
        cols = gridState.getCols();

        originalState = new boolean[rows][cols];
        newState = new boolean[rows][cols];
        for (List<Integer> activatedCell : gridState.getActiveCells())
        {
            originalState[activatedCell.get(0)][activatedCell.get(1)] = true;
        }
    }

    /**
     * Evaluate a singe cell to determine if it will die, or come to life
     *
     * @param row row index
     * @param col column index
     */
    private void evaluateCell(int row, int col)
    {
        if (visited[row][col])
            return;
        visited[row][col] = true;

        int neighbors = 0;
        for (int[] it : gridIterator)
        {
            if ((-1 < (row + it[0]) && (row + it[0]) < rows) &&
                (-1 < (col + it[1]) && (col + it[1]) < cols))
            {
                if (originalState[row + it[0]][col + it[1]])
                    neighbors++;
                else
                    evaluateCell(row + it[0], col + it[1]);
            }
        }

        newState[row][col] = liveCellLivesOn(row, col, neighbors) ||
                             deadCellBecomesAlive(row, col, neighbors);
    }

    /**
     * A dead cell with exactly 3 neighbors comes to life
     *
     * @param row row index
     * @param col column index
     * @param neighbors number of neighbors
     * @return true if dead cell comes to life
     */
    private boolean deadCellBecomesAlive(int row, int col, int neighbors)
    {
        return !originalState[row][col] && neighbors == 3;
    }

    /**
     * A living cell lives on if it has 2 or 3 neighbors. It is happy :)
     *
     * @param row row index
     * @param col column index
     * @param neighbors number of neighbors
     * @return true if live cell lives on to the next generation
     */
    private boolean liveCellLivesOn(int row, int col, int neighbors)
    {
        return originalState[row][col] && (neighbors == 2 || neighbors == 3);
    }
}
