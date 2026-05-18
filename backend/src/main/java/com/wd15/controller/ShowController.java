package com.wd15.controller;

import com.wd15.dto.ShowRequest;
import com.wd15.model.Show;
import com.wd15.service.ShowService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/shows")
public class ShowController {
    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping
    public List<Show> getShows(@RequestParam(required = false) Long movieId) {
        return movieId == null ? showService.findAll() : showService.findByMovie(movieId);
    }

    @PostMapping
    public Show create(@RequestBody ShowRequest request) {
        return showService.create(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        showService.delete(id);
    }
}
