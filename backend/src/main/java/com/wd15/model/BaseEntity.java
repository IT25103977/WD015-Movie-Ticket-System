package com.wd15.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    //Attribute
    private Long id;

    //Default Constructor
    public BaseEntity() {
    }

    //Parameterized Constructor
    public BaseEntity(Long id) {
        this.id = id;
    }

    //Getter
    public Long getId() {
        return id;
    }

    //Settter
    public void setId(Long id) {
        this.id = id;
    }
}
