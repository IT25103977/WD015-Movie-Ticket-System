package models;

public class UpccomingMovies extends Movie{
    private String releaseDate; //attributes
    private String trailerUrl;

    public UpccomingMovies() { //empty constructor

    }

    public UpccomingMovies(String title, int id, String genre, String director, double price, int totalSeats, String releaseDate, String trailerUrl) { //parameterized constructor
        super(title, id, genre, director, price, totalSeats);
        this.releaseDate = releaseDate;
        this.trailerUrl = trailerUrl;
    }

    //getter and setter


    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    @Override
    public void displaydetails() { //print details
        super.displaydetails();
        System.out.println("Movie releaseDate : " + releaseDate);
        System.out.println("Movie trailerUrl : " + trailerUrl);
    }
}
