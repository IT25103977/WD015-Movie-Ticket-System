package com.wd15.model;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User {
    private String adminLevel;

    public Admin() {
    }

    public Admin(String name, String email, String password, String adminLevel) {
        super(name, email, password, "Admin");
        this.adminLevel = adminLevel;
    }

    public String getAdminLevel() {
        return adminLevel;
    }

    public void setAdminLevel(String adminLevel) {
        this.adminLevel = adminLevel;
    }
}
