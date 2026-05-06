package com.wd15.model;

import java.time.LocalDateTime;

public class Payment {

    //Attributes (Encapsulation )
    private long id;
    private long    bookingId;
    private double amount;
    private String paymentMethod;
    private String paymentDate;
    private String status;
    private String transactionId;

    //Constructor
    public Payment (){

    }

    public Payment(long bookingId, double amount, String paymentMethod){
     this.bookingId = bookingId;
     this.amount = amount;
     this.paymentMethod = paymentMethod;

     this.paymentDate = LocalDateTime.now().toString();
     this.status = "Success";
     this.transactionId = "TXN" + System.currentTimeMillis();
    }

    //set the getters
    public long getId(){
        return id;
    }

    public long getBookingId(){
        return bookingId;
    }

    public double getAmount(){
        return amount;
    }

    public String getPaymentMethod(){
        return paymentMethod;
    }

    public String getPaymentDate(){
        return paymentDate;
    }

    public String getStatus(){
        return status;
    }

    public String getTransactionId(){
        return transactionId;
    }

    // set the setters
    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void refund(){
        this.status = "Refunded";
    }

    public void displayInfo(){
        System.out.println("Payment ID: " + id);
        System.out.println("Booking ID: " + bookingId);
        System.out.println("Amount: " + amount);
        System.out.println("Payment Method: " + paymentMethod);
        System.out.println("Payment Date: " + paymentDate);
        System.out.println("Status: " + status);
        System.out.println("Transaction ID: " + transactionId);
    }


}