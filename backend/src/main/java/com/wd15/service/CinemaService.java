package com.wd15.service;

import com.wd15.model.Cinema;
import com.wd15.repository.CinemaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    public CinemaService(CinemaRepository cinemaRepository) {
        this.cinemaRepository = cinemaRepository;
    }

    public List<Cinema> findAll() {
        return cinemaRepository.findAll();
    }

    public Cinema save(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    public void delete(Long id) {
        cinemaRepository.deleteById(id);
    }
}
