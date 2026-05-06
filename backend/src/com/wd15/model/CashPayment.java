package com.wd15.model;

public class CashPayment extends Payment{

    //Attributes
    private double amountReceived;
    private double changeGiven;

    //Constructor
    public CashPayment(){

    }

    public CashPayment(long bookingId, double amount, String paymentMethod, double amountReceived){
        super(bookingId, amount, paymentMethod);

        this.amountReceived = amountReceived;
        this.changeGiven = amountReceived - amount;

    }

    //Set the getters
    public double getAmountReceived(){
        return amountReceived;

    }

    public double getChangeGiven(){
        return changeGiven;
    }

    //override

    @Override
    public void displayInfo() {
        super.displayInfo();

        System.out.println("Amount Recived: " + amountReceived);
        System.out.println("Change Givern: " + changeGiven);
    }
}
