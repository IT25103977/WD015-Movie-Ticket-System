package com.wd15.model;

import jakarta.persistence.Entity;

@Entity
public class Cinema extends BaseEntity {
    private String name;
    private String location;

    public Cinema() {
    }

    public Cinema(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
