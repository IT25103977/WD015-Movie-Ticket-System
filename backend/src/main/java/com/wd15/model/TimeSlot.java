package com.wd15.model;

import jakarta.persistence.Entity;

@Entity
public class TimeSlot extends BaseEntity {
    private String slotValue;;

    public TimeSlot() {
    }

    public TimeSlot(String slotValue) {
        this.slotValue = slotValue;
    }

    public String getSlotValue() {
        return slotValue;
    }

    public void setSlotValue(String slotValue) {
        this.slotValue = slotValue;
    }
}
