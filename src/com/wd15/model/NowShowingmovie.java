package com.wd15.model;

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

    @Override
    public void displaydetails() { //print details
        super.displaydetails();
        System.out.println("Movie Theatre Number : " + theatreNumber);
        System.out.println("\nMovie show time : " + showTime);
    }
}
