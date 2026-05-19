package com.wd15.model;

import jakarta.persistence.Entity;

@Entity
public class FoodItem extends BaseEntity {
    private String category;
    private String name;
    private int price;
    private String detail;

    public FoodItem() {
    }

    public FoodItem(String category, String name, int price, String detail) {
        this.category = category;
        this.name = name;
        this.price = price;
        this.detail = detail;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
