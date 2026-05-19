package com.wd15.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_users")
public class User extends Person {
    private String password;
    private String role;
    private String phone;
    private String status;
    private String joinedDate;
    private String lastLogin;
    private String avatar;

    public User() {
    }

    public User(String name, String email, String password, String role) {
        super(name, email);
        this.password = password;
        this.role = role;
        this.status = "Active";
        this.joinedDate = java.time.LocalDate.now().toString();
        this.lastLogin = "Just now";
        this.avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(String joinedDate) {
        this.joinedDate = joinedDate;
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
