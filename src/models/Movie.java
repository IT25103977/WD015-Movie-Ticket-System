package models;

public class Movie {
    private int id;  //attributes
    private String title;
    private String genre;
    private String director;
    private double price;
    private int totalSeats;
    private String status;

    public Movie() { //empty constructor

    }

    public Movie(String title, int id, String genre, String director, double price, int totalSeats) { // parameterized constructor
        this.title = title;
        this.id = id;
        this.genre = genre;
        this.director = director;
        this.price = price;
        this.totalSeats = totalSeats;
    }

    //getters
    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
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

    public void setId(int id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void displaydetails(){
        System.out.println("Movie ID : " + getId());
        System.out.println("Movie title : " + getTitle());
        System.out.println("Movie genre : " + getGenre());
        System.out.println("Movie director : " + getDirector());
        System.out.println("Movie states : "  + getStatus());
        System.out.println("Movie total seats : " + getTotalSeats());
        System.out.println("Movie price : " + getPrice());
    }
}
