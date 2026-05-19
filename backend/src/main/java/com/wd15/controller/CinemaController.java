package com.wd15.controller;

import com.wd15.model.Cinema;
import com.wd15.service.CinemaService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/cinemas")
public class CinemaController {
    private final CinemaService cinemaService;

    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    @GetMapping
    public List<Cinema> getCinemas() {
        return cinemaService.findAll();
    }

    @PostMapping
    public Cinema create(@RequestBody Cinema cinema) {
        return cinemaService.save(cinema);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        cinemaService.delete(id);
    }
}
