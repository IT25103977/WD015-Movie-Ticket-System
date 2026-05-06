package com.wd15.model;

class RegularUser extends User {

    //Attributes
    private String membershipType;
    private int totalBookings;

    //Empty constructor
    public RegularUser() {
        super();
    }

    //Parameterized constructor
    public RegularUser(String name,String email,String password,String phoneNumber,String membershipType) {
        //Initialize parent class attributes first
        super(name, email, password, phoneNumber);
        this.membershipType=membershipType;
        this.totalBookings=0;
    }

    //All the getters
    public String getMembershipType() {
        return membershipType;
    }

    public int getTotalBookings() {
        return totalBookings;
    }

    //Setter
    public void setMembershipType(String membershipType) {
        this.membershipType=membershipType;
    }

    // Method to increment bookings
    public void incrementBookings() {
        this.totalBookings++;
    }

    // Override displayInfo (Polymorphism)
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Membership Type: " +membershipType);
        System.out.println("Total Bookings: " +totalBookings);
    }
}
