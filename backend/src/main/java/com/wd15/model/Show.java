package com.wd15.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "movie_shows")
public class Show extends BaseEntity {
    @ManyToOne
    private Movie movie;

    @ManyToOne
    private Cinema cinema;

    private String showDate;
    private String showTime;

    public Show() {
    }

    public Show(Movie movie, Cinema cinema, String showDate, String showTime) {
        this.movie = movie;
        this.cinema = cinema;
        this.showDate = showDate;
        this.showTime = showTime;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }
}
