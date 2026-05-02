package com.wd15.model;

public class OnlineBooking extends Booking{
    private String confirmationCode;
    private String paymentMethod;

    //Default constructor
    public OnlineBooking(Long id, Long userId, Long movieId, Long seatId, String customerName, String movieTitle, String seatNumber, double totalPrice, String status) {
        super(id, userId, movieId, seatId, customerName, movieTitle, seatNumber, totalPrice, status);
    }

    //parameterized constructor
    public OnlineBooking(Long id, Long userId, Long movieId, Long seatId, String customerName, String movieTitle, String seatNumber, double totalPrice, String status, String confirmationCode, String paymentMethod) {
        super(id, userId, movieId, seatId, customerName, movieTitle, seatNumber, totalPrice, status);
        this.confirmationCode = "ON";
        this.paymentMethod = paymentMethod;
    }

    //getter and setter methods
    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    //method to send a confirmation mail
    public void sendConfirmationEmail() {
        System.out.println("Email sent to " + getCustomerName() +
                " with Confirmation Code: " + this.confirmationCode);
    }
    //method to cancel the booking
    public void cancelBooking() {
        // Call the parent logic first
        super.cancelBooking();
        // Add online-specific logic
        System.out.println("Processing online refund to: " + this.paymentMethod);
    }
}
