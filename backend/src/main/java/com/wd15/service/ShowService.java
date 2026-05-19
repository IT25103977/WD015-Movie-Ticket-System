package com.wd15.service;

import com.wd15.dto.ShowRequest;
import com.wd15.model.Cinema;
import com.wd15.model.Movie;
import com.wd15.model.Show;
import com.wd15.repository.CinemaRepository;
import com.wd15.repository.MovieRepository;
import com.wd15.repository.ShowRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShowService {
    private final ShowRepository showRepository;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;

    public ShowService(ShowRepository showRepository, MovieRepository movieRepository, CinemaRepository cinemaRepository) {
        this.showRepository = showRepository;
        this.movieRepository = movieRepository;
        this.cinemaRepository = cinemaRepository;
    }

    public List<Show> findAll() {
        return showRepository.findAll();
    }

    public List<Show> findByMovie(Long movieId) {
        return showRepository.findByMovieId(movieId);
    }

    public Show save(Show show) {
        return showRepository.save(show);
    }

    public Show create(ShowRequest request) {
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
        Cinema cinema = cinemaRepository.findById(request.getCinemaId())
                .orElseThrow(() -> new IllegalArgumentException("Cinema not found"));
        return showRepository.save(new Show(movie, cinema, request.getShowDate(), request.getShowTime()));
    }

    public void delete(Long id) {
        showRepository.deleteById(id);
    }
}
