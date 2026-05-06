package com.wd15.model;

import java.security.PrivateKey;
import java.time.LocalDateTime;

public class Payment {

    private long id;
    private long    bookingId;
    private double amount;
    private String paymentMethod;
    private String paymentDate;
    private String status;
    private String transactionId;

    public Payment (){

    }

    public Payment(long bookingId, double amount, String paymentMethod, String paymentDate){
     this.bookingId = bookingId;
     this.amount = amount;
     this.paymentMethod = paymentMethod;

     this.paymentDate = LocalDateTime.now().toString();
     this.status = "Success";
     this.transactionId = "TXN" + System.currentTimeMillis();
    }

    

}