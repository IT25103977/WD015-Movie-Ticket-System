package com.wd15.service;

import com.wd15.model.Movie;
import com.wd15.repository.MovieRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> findAll() {
        return movieRepository.findAll();
    }

    public List<Movie> findByStatus(String status) {
        return movieRepository.findByStatus(status);
    }

    public Movie save(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie update(Long id, Movie movie) {
        movie.setId(id);
        return movieRepository.save(movie);
    }

    public void delete(Long id) {
        movieRepository.deleteById(id);
    }
}
