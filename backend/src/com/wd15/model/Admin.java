package com.wd15.model;

import java.time.LocalDateTime;

public class Admin {

    private Long id;//attributes
    private String adminCode;
    private String name;
    private String email;
    private String password;
    private String accessLevel;
    private String lastLogin;
    private boolean isActive;

    // Empty constructor
    public Admin() {
    }

    // Full constructor
    public Admin(String adminCode, String name, String email, String password, String accessLevel) {
        this.adminCode = adminCode;
        this.name = name;
        this.email = email;
        this.password = password;
        this.accessLevel = accessLevel;
        this.isActive = true;
        this.lastLogin = LocalDateTime.now().toString();
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getAdminCode() {
        return adminCode;
    }

    public void setAdminCode(String adminCode) {
        this.adminCode = adminCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(String accessLevel) {
        this.accessLevel = accessLevel;
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    // Business method
    public void deactivate() {
        this.isActive = false;
    }

    // Display method
    public void displayInfo() {
        System.out.println("Admin Details:");
        System.out.println("Code: " + adminCode);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Access Level: " + accessLevel);
        System.out.println("Last Login: " + lastLogin);
        System.out.println("Active: " + isActive);
        System.out.println("--------------------------");
    }


}
