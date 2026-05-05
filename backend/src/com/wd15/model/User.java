package com.wd15.model;

public class User {
    //Attributes
    private long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String phoneNumber;

    //Default Constructor
    public User() {
    }

    //Parameterized Constructor
    public User(String name,String email,String password,String phoneNumber) {
        this.name=name;
        this.email=email;
        this.password=password;
        this.role="User";//Default roles
        this.phoneNumber=phoneNumber;
    }

    //All the getters
    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    //All the setters
    public void setId(int userId) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // Method
    public void displayInfo() {
        System.out.println("User ID: " +id);
        System.out.println("Name: " +name);
        System.out.println("Email: " +email);
        System.out.println("Phone Number: " +phoneNumber);
    }

}
