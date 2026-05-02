package com.wd15.model;

public class Booking {
    //Attributes
    private Long id;
    private Long userId;
    private Long movieId;
    private Long seatId;
    private String customerName;
    private String movieTitle;
    private String seatNumber;
    private double totalPrice;
    private String status;

    //default constructor
    public Booking() {
    }

    //parameterized constructor
    public Booking(Long id, Long userId, Long movieId, Long seatId, String customerName, String movieTitle, String seatNumber, double totalPrice, String status) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.seatId = seatId;
        this.customerName = customerName;
        this.movieTitle = movieTitle;
        this.seatNumber = seatNumber;
        this.totalPrice = totalPrice;
        this.status = "Pending";
    }

    //Implemening getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getSeatId() {
        return seatId;
    }

    public void setSeatId(Long seatId) {
        this.seatId = seatId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    // method to cancel the booking
    public void cancelBooking() {
        this.status = "Cancelled";
        System.out.println("Booking status updated to: " + this.status);
    }

    // method to display
    public void displayBookingDetails() {
        System.out.println("Booking ID: " + id);
        System.out.println("Customer: " + customerName);
        System.out.println("Movie: " + movieTitle);
        System.out.println("Total: $" + totalPrice);
    }

}
