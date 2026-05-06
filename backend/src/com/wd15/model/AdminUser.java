package com.wd15.model;

public class AdminUser extends User {

    //Attributes
    private String accessLevel;
    private String department;

    //Empty constructor
    public AdminUser() {
        super();
    }

    //Parameterized constructor
    public AdminUser(String name,String email,String password,String phoneNumber,String accessLevel,String department) {

        //Initialize parent class attributes first
        super(name, email, password, phoneNumber);
        setRole("Admin");
        this.accessLevel=accessLevel;
        this.department=department;
    }

    //All the Getters
    public String getAccessLevel() {
        return accessLevel;
    }

    public String getDepartment() {
        return department;
    }

    //Setter
    public void setAccessLevel(String accessLevel) {
        this.accessLevel=accessLevel;
    }

    // Overridden method (Polymorphism)
    @Override
    public void displayInfo() {
        System.out.println("ID: " +getId());
        System.out.println("Name: " +getName());
        System.out.println("Email: " +getEmail());
        System.out.println("Password: " +getPassword());
        System.out.println("Role: " +getRole());
        System.out.println("Phone Number: " +getPhoneNumber());
        System.out.println("Access Level: " +accessLevel);
        System.out.println("Department: " +department);
    }
}