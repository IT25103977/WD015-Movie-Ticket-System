package com.wd15.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Payment {
    private String method;
    private String status;
    private int amount;

    public Payment() {
    }

    public Payment(String method, String status, int amount) {
        this.method = method;
        this.status = status;
        this.amount = amount;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
