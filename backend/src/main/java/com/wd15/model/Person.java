package com.wd15.model;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Person extends BaseEntity {

    //Attributes
    private String name;
    private String email;

    //Default Constructor
    public Person() {
    }

    //Parameterized Constructor
    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    //Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    //Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}