package models;

public class Movie {
    int Id;  //attributes
    String Title;
    String genre;
    String director;
    double price;
    int totalSeats;
    String status;

    public Movie() { //empty constructor

    }

    public Movie(String title, int id, String genre, String director, double price, int totalSeats) { // full constructor
        Title = title;
        Id = id;
        this.genre = genre;
        this.director = director;
        this.price = price;
        this.totalSeats = totalSeats;
    }

    //getters
    public int getId() {
        return Id;
    }

    public String getTitle() {
        return Title;
    }

    public String getGenre() {
        return genre;
    }

    public String getDirector() {
        return director;
    }

    public double getPrice() {
        return price;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public String getStatus() {
        return status;
    }

    //setters

}
