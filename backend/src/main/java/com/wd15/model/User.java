package com.wd15.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_users")
public class User extends Person {

    //Attributes
    private String password;
    private String role;
    private String phone;
    private String status;
    private String joinedDate;
    private String lastLogin;
    private String avatar;

    //Default Constructor
    public User() {
    }

    //Parameterized Constructor
    public User(String name, String email, String password, String role) {
        super(name, email);
        this.password = password;
        this.role = role;
        this.status = "Active";
        this.joinedDate = java.time.LocalDate.now().toString();
        this.lastLogin = "Just now";
        this.avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name;
    }

    //Getters
    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

    public String getJoinedDate() {
        return joinedDate;
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public String getAvatar() {
        return avatar;
    }

    //Setters
    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setJoinedDate(String joinedDate) {
        this.joinedDate = joinedDate;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

}
