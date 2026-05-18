package com.wd15.model;

import jakarta.persistence.Entity;

@Entity
public class Cinema extends BaseEntity {
    private String name; //attributes
    private String location;

    public Cinema() {//empty constructor
    }

    public Cinema(String name, String location) { //parameterize constructor
        this.name = name;
        this.location = location;
    }
    
    //setters and getters
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
