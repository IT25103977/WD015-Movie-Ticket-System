package com.wd15.model;

public class CardPayment extends Payment{

    //Attributes
    private String cardLastFourDigits;
    private String cardType;

    //Constructor
    public  CardPayment(){

    }

    public CardPayment (long bookingId, double amount, String paymentMethod, String cardLastFourDigits, String cardType ){
        super(bookingId, amount, paymentMethod);

        this.cardLastFourDigits = cardLastFourDigits;
        this.cardType = cardType;
    }

    //Set the getters
    public String getCardLastFourDigits(){
        return cardLastFourDigits;
    }

    public String getCardType(){
        return cardType;
    }

    //Override
    @Override
    public void displayInfo(){

        super.displayInfo();

        System.out.println("Card Last Four Digits: " + cardLastFourDigits);
        System.out.println("Card Type: " + cardType);
    }

}
