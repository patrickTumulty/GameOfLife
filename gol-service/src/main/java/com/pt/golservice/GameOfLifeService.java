package com.pt.golservice;

import com.pt.golservice.RestModels.GridState;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*") // TODO look up what this does
public class GameOfLifeService
{
    @PostMapping("/get-next-generation")
    public GridState getNextGeneration(@RequestBody GridState gridState)
    {
        if (gridState.getActiveCells().isEmpty())
        {
            return gridState;
        }

        GameOfLifeProcessor gameOfLifeProcessor = new GameOfLifeProcessor();
        return gameOfLifeProcessor.getNextGeneration(gridState);
    }
}
