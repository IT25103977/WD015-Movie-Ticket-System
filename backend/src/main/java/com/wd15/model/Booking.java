package com.wd15.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Booking extends BaseEntity {
    @ManyToOne
    private User user;

    @ManyToOne
    private Show show;

    private int adults;
    private int children;
    private String customerName;
    private String email;
    private String phone;
    private int ticketTotal;
    private int foodTotal;
    private int grandTotal;

    @ElementCollection
    @CollectionTable(name = "booking_seats", joinColumns = @JoinColumn(name = "booking_id"))
    private List<String> seats = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "booking_food", joinColumns = @JoinColumn(name = "booking_id"))
    private List<String> foodNames = new ArrayList<>();

    @Embedded
    private Payment payment;

    public Booking() {
    }

    public Booking(User user, Show show, int adults, int children, List<String> seats, List<String> foodNames,
            String customerName, String email, String phone, Payment payment) {
        this.user = user;
        this.show = show;
        this.adults = adults;
        this.children = children;
        this.seats = seats;
        this.foodNames = foodNames;
        this.customerName = customerName;
        this.email = email;
        this.phone = phone;
        this.payment = payment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Show getShow() {
        return show;
    }

    public void setShow(Show show) {
        this.show = show;
    }

    public int getAdults() {
        return adults;
    }

    public void setAdults(int adults) {
        this.adults = adults;
    }

    public int getChildren() {
        return children;
    }

    public void setChildren(int children) {
        this.children = children;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }

    public List<String> getFoodNames() {
        return foodNames;
    }

    public void setFoodNames(List<String> foodNames) {
        this.foodNames = foodNames;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getTicketTotal() {
        return ticketTotal;
    }

    public void setTicketTotal(int ticketTotal) {
        this.ticketTotal = ticketTotal;
    }

    public int getFoodTotal() {
        return foodTotal;
    }

    public void setFoodTotal(int foodTotal) {
        this.foodTotal = foodTotal;
    }

    public int getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(int grandTotal) {
        this.grandTotal = grandTotal;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
