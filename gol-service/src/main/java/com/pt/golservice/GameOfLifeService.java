package com.pt.golservice;

import com.pt.golservice.RestModels.GridState;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*") // TODO look up what this does
public class GameOfLifeService
{
    public GameOfLifeService()
    {

    }

    @PostMapping("/get-next-generation")
    public GridState simpleRequest(@RequestBody GridState object)
    {
        System.out.println(object);

        return object;
    }
}
