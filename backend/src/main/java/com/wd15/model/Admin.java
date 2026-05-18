package com.wd15.model;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User {
    private String adminLevel; //attributes

    public Admin() { //empty constructor
    }

    public Admin(String name, String email, String password, String adminLevel) { //parameterized constructor
        super(name, email, password, "Admin");
        this.adminLevel = adminLevel;
    }
    //setters and getters
    public String getAdminLevel() {
        return adminLevel;
    }

    public void setAdminLevel(String adminLevel) {
        this.adminLevel = adminLevel;
    }
}
