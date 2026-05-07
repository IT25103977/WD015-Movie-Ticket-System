package com.wd15.main;

import com.wd15.model.CardPayment;
import com.wd15.model.CashPayment;

public class MainApp {
    public static void main(String[] args) {
        CardPayment card = new CardPayment(
                101,2500,"card","4521","visa"
        );

        card.displayInfo();

        CashPayment cash = new CashPayment(
                102,3000,"cash", 2000
        );

        cash.displayInfo();

        card.refund();

        System.out.println("Payment After Refund: " + card.getStatus());
    }
}