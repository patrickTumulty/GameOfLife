package com.pt.golservice.RestModels;

import java.util.List;

public class GridState
{
    private int rows;
    private int cols;
    private List<List<Byte>> data;

    public int getCols()
    {
        return cols;
    }

    public void setCols(int cols)
    {
        this.cols = cols;
    }

    public int getRows()
    {
        return rows;
    }

    public void setRows(int rows)
    {
        this.rows = rows;
    }

    public List<List<Byte>> getData()
    {
        return data;
    }

    public void setData(List<List<Byte>> data)
    {
        this.data = data;
    }

    @Override
    public String toString()
    {
        StringBuilder sb = new StringBuilder();
        sb.append("rows=").append(rows).append("\n");
        sb.append("cols=").append(cols).append("\n");
        for (var row : data) {
            sb.append("[").append(row.get(0))
              .append(",").append(row.get(1)).append("]\n");
        }
        return sb.toString();
    }
}
