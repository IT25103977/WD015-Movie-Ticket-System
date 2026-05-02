package com.wd15.model;

public class CounterBooking extends Booking{
    private String staffId;
    private int counterNo;
    private String paymentType;

    //default constructor
    public CounterBooking(Long id, Long userId, Long movieId, Long seatId, String customerName, String movieTitle, String seatNumber, double totalPrice, String status) {
        super(id, userId, movieId, seatId, customerName, movieTitle, seatNumber, totalPrice, status);
    }

    //parameterized constructor
    public CounterBooking(Long id, Long userId, Long movieId, Long seatId, String customerName, String movieTitle, String seatNumber, double totalPrice, String status, String paymentType, String staffId, int counterNo) {
        super(id, userId, movieId, seatId, customerName, movieTitle, seatNumber, totalPrice, status);
        this.paymentType = "Cash";
        this.staffId = staffId;
        this.counterNo = counterNo;
    }
    //getter and setter methods
    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public int getCounterNo() {
        return counterNo;
    }

    public void setCounterNo(int counterNo) {
        this.counterNo = counterNo;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }
    // method to Print Ticket
    public void printPhysicalTicket() {
        System.out.println("Printing ticket for " + getMovieTitle() + "...");
        System.out.println("Issued by Staff: " + this.staffId + " at Counter: " + this.counterNo);
    }

    // Method to cancel the online booking
    public void cancelBooking() {
        super.cancelBooking(); // Set status to cancelled[cite: 1]
        System.out.println("Please collect your cash refund from Counter " + this.counterNo);
    }
}
