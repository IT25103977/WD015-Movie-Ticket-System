package com.wd15.model;

public class Seat {
    private Long id;

    private Long movieId;
    private String seatNumber;
    private String rowLetter;
    private int seatColumn;
    private boolean isBooked;
    private String seatType;

    // default constructor
    public Seat() {}

    // Parameterized constructor
    public Seat(Long movieId, String seatNumber, String rowLetter, int seatColumn, String seatType) {
        this.movieId = movieId;
        this.seatNumber = seatNumber;
        this.rowLetter = rowLetter;
        this.seatColumn = seatColumn;
        this.seatType = seatType;
        this.isBooked = false;
    }
    // Getters
    public Long getId() {
        return id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public String getRowLetter() {
        return rowLetter;
    }

    public int getSeatColumn() {
        return seatColumn;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public String getSeatType() {
        return seatType;
    }

    // Setter for seatType
    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    // Book the seat
    public void bookSeat() {
        this.isBooked = true;
    }

    // Release the seat
    public void releaseSeat() {
        this.isBooked = false;
    }

    // Display
    public void displayStatus() {
        String status = isBooked ? "Booked" : "Available";
        System.out.println(seatNumber + ": " + status);
    }
}

