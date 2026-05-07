package com.wd15.model;

public class StandardSeat extends Seat {

    private String rowSection;

    // Constructor
    public StandardSeat(Long movieId, String seatNumber, String rowLetter, int seatColumn,
                        String rowSection) {
        super(movieId, seatNumber, rowLetter, seatColumn, "Standard");
        this.rowSection = rowSection;
    }

    // Getter
    public String getRowSection() {
        return rowSection;
    }

    //  display
    public void displayStatus() {
        String status = isBooked() ? "Booked" : "Available";
        System.out.println("STANDARD - " + getSeatNumber() + " [" + rowSection + "]: " + status);
    }

}
