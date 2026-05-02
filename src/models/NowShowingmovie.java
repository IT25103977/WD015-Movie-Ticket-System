package models;

public class NowShowingmovie extends Movie{
    private String showTime; //attributes
    private int theatreNumber;

    public NowShowingmovie() { //empty constructor

    }

    public NowShowingmovie(String title, int id, String genre, String director, double price, int totalSeats, String showTime, int theatreNumber) { //parameterized cnstructor
        super(title, id, genre, director, price, totalSeats);
        this.showTime = showTime;
        this.theatreNumber = theatreNumber;
    }

    //getter

    public String getShowTime() {
        return showTime;
    }

    public int getTheatreNumber() {
        return theatreNumber;
    }

    //setter

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public void setTheatreNumber(int theatreNumber) {
        this.theatreNumber = theatreNumber;
    }

    public void displaydetails(){
        System.out.println("Movie ID : " + getId());
        System.out.println("Movie title : " + getTitle());
        System.out.println("Movie genre : " + getGenre());
        System.out.println("Movie director : " + getDirector());
        System.out.println("Movie states : "  + getStatus());
        System.out.println("Movie Show Time : " + showTime);
        System.out.println("Movie theatre Number : " + theatreNumber);
        System.out.println("Movie total seats : " + getTotalSeats());
        System.out.println("Movie price : " + getPrice());



    }
}
