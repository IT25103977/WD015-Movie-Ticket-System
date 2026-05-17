package com.wd15.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
public class Movie extends BaseEntity {
    private String title;
    private String image;
    private double rating;
    private String duration;
    private String status;
    private int adultPrice;
    private int childPrice;
    private String trailerUrl;
    private String synopsis;
    private String releaseDate;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    public Movie() {
    }

    public Movie(String title, String image, List<String> tags, double rating, String duration, String status,
            int adultPrice, int childPrice, String trailerUrl, String synopsis, String releaseDate) {
        this.title = title;
        this.image = image;
        this.tags = tags;
        this.rating = rating;
        this.duration = duration;
        this.status = status;
        this.adultPrice = adultPrice;
        this.childPrice = childPrice;
        this.trailerUrl = trailerUrl;
        this.synopsis = synopsis;
        this.releaseDate = releaseDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAdultPrice() {
        return adultPrice;
    }

    public void setAdultPrice(int adultPrice) {
        this.adultPrice = adultPrice;
    }

    public int getChildPrice() {
        return childPrice;
    }

    public void setChildPrice(int childPrice) {
        this.childPrice = childPrice;
    }

    @Transient
    public Map<String, Integer> getPrices() {
        return Map.of("adult", adultPrice, "child", childPrice);
    }

    public void setPrices(Map<String, Integer> prices) {
        this.adultPrice = prices.getOrDefault("adult", adultPrice);
        this.childPrice = prices.getOrDefault("child", childPrice);
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }
}
